const { defineConfig } = require('cypress');

module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000', // 서버 URL
    env: {
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  },
};
