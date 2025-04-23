/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: false,
      },
    ],
  },
  moduleNameMapper: {
    // Mock all the problematic imports
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  // Auto mock core modules that are difficult to test
  automock: false,
  setupFiles: ['<rootDir>/src/tests/setup.ts'],
};
