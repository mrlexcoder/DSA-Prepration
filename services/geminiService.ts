
import { GoogleGenAI, Type } from "@google/genai";
import { ExecutionResult, Problem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const simulateExecution = async (problem: Problem, code: string): Promise<ExecutionResult> => {
  const model = "gemini-3-pro-preview";
  
  const prompt = `
    Act as a high-performance Java 21 compiler and test runner.
    
    Problem Title: ${problem.title}
    Problem Description: ${problem.description}
    User Code:
    \`\`\`java
    ${code}
    \`\`\`
    
    Task:
    1. Check the user code for syntax errors.
    2. If there are syntax errors, return status 'Compile Error' with stderr.
    3. If syntactically correct, simulate running the code against the following test cases:
       ${problem.testCases.map((tc, i) => `Case ${i+1}: Input="${tc.input}", Expected="${tc.expectedOutput}"`).join('\n')}
    4. Provide the stdout (if any print statements exist) and the actual result for each test case.
    5. Determine the overall status (Accepted, Wrong Answer, Runtime Error).
    6. Estimate a realistic runtime in milliseconds.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "Accepted, Wrong Answer, Runtime Error, or Compile Error" },
            stdout: { type: Type.STRING },
            stderr: { type: Type.STRING },
            runtime: { type: Type.NUMBER },
            testResults: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  input: { type: Type.STRING },
                  expected: { type: Type.STRING },
                  actual: { type: Type.STRING },
                  passed: { type: Type.BOOLEAN }
                },
                required: ["input", "expected", "actual", "passed"]
              }
            }
          },
          required: ["status", "stdout", "stderr", "runtime", "testResults"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as ExecutionResult;
  } catch (error) {
    console.error("Gemini Execution Error:", error);
    return {
      status: 'Runtime Error',
      stdout: '',
      stderr: 'Internal Simulation Error: Failed to communicate with the virtual JVM.',
      runtime: 0,
      testResults: []
    };
  }
};

export const getCodeHints = async (problem: Problem, currentCode: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const prompt = `I am stuck on this Java problem: ${problem.title}. 
  Description: ${problem.description}
  My current code: 
  ${currentCode}
  Give me a small, concise hint without revealing the full solution. Use Markdown.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });
    return response.text || "Keep trying! Check your logic and edge cases.";
  } catch (error) {
    return "Hints are currently unavailable.";
  }
};
