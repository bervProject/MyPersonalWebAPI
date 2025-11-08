module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["**/src/*.{ts,tsx}"],
  coverageDirectory: "./coverage/",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!uuid)',
    '<rootDir>/node_modules/buffer-equal-constant-time/*',
  ],
};
