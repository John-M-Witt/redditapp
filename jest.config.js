const module = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
    coverageReporters: ["text", "lcov"],
    setupFilesAfterEnv: ['./jest.setup.js'],
    testEnvironment: 'jsdom'
  };
  