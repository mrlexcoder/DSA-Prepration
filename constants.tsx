
import { Problem } from './types';

export const DEFAULT_PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to target*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

### Example 1:
**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

### Example 2:
**Input:** nums = [3,2,4], target = 6
**Output:** [1,2]`,
    starterCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`,
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]', isPublic: true },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]', isPublic: true }
    ]
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.

### Example 1:
**Input:** x = 121
**Output:** true
**Explanation:** 121 reads as 121 from left to right and from right to left.

### Example 2:
**Input:** x = -121
**Output:** false
**Explanation:** From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.`,
    starterCode: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your code here
        return false;
    }
}`,
    testCases: [
      { input: 'x = 121', expectedOutput: 'true', isPublic: true },
      { input: 'x = -121', expectedOutput: 'false', isPublic: true }
    ]
  }
];
