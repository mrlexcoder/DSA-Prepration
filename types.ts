
export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export interface ExecutionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compile Error';
  stdout: string;
  stderr: string;
  runtime: number; // in ms
  testResults: {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
}

export enum TabType {
  DESCRIPTION = 'Description',
  SOLUTIONS = 'Solutions',
  SUBMISSIONS = 'Submissions'
}
