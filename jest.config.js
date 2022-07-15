module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      isolatedModules: true,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src/__tests__'],
  testMatch: ['**/*.(test|spec).(tsx|ts|jsx|js)'],
  modulePathIgnorePatterns: ['<rootDir>/src/__tests__/done', '<rootDir>/node_modules'],
};
