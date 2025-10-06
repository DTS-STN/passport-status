import type { Config } from 'jest';

const config: Config = {
  modulePathIgnorePatterns: ['./cypress'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules) https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // Handle image imports https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle React markdown not being pre-compiled
    'react-markdown': '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
  },
  coverageReporters: ['clover', 'json', 'json-summary', 'lcov', ['text', { skipFull: true }]],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          [
            'next/babel',
            {
              'preset-react': { runtime: 'automatic' }, // ✅ enable modern JSX
            },
          ],
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@faker-js/faker)', // Allow @faker-js/faker to be transpiled, v10 uses ESM
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

export default config;
