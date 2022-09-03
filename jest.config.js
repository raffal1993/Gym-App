module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      isolatedModules: true,
    },
  },

  setupFiles: [
    '<rootDir>/src/__tests__/setupMocks/auth.ts',
    '<rootDir>/src/__tests__/setupMocks/uuid.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src/__tests__'],
  testMatch: ['**/*.(test|spec).(tsx|ts|jsx|js)'],
};
