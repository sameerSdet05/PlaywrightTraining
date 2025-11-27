// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./src/tests/e2e",
  use: {
    headless: true,
    baseURL: "https://www.saucedemo.com",
    screenshot: "only-on-failure",
    trace: "on-first-retry"
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/html-report", open: "never" }]
  ],
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" }
    }
  ]
});