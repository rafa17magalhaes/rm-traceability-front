module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',  // Usa o ambiente jsdom padrão
    testEnvironmentOptions: {
      url: 'http://localhost',  // Garante que a URL seja definida para o jsdom
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    // Se algum módulo ESM precisar ser transformado, adicione-o aqui:
    transformIgnorePatterns: ['/node_modules/(?!(axios|react-router-dom)/)'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };
  