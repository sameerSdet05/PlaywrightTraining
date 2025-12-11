const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests',
  
  // ⏱️ Timeout settings
  timeout: 30000,                    // 30s per test
  expect: {
    timeout: 10000                   // 10s for assertions
  },
  
  // 🔄 Retry failed tests
  retries: process.env.CI ? 2 : 2,   // 2 retries in CI, 1 locally
  
  // 🎭 Browser settings
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    
    //Screenshots on failure
    screenshot: 'only-on-failure',
    
    //Videos for debugging
    video: 'retain-on-failure',
    
    // 📊 Trace for analysis
    trace: 'on-first-retry',
    
    // ⏰ Action timeout
    actionTimeout: 10000,
    
    // 🧭 Navigation timeout
    navigationTimeout: 30000
  },
  
  // 📋 Multiple reporters
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/test-results.json' }]
  ],
  
  // 🌐 Browser projects
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    }
  ]
});