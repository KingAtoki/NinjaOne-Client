module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-utils.jsx'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/fileMock.cjs',
    '\\.css$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};