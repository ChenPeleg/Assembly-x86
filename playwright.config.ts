import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  timeout: 120_000,
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 1 : 0,
  reporter: process.env["CI"] ? "github" : "list",
  use: {
    baseURL: "http://localhost:4200",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "iphone-12",
      use: { ...devices["iPhone 12"], browserName: "chromium" },
    },
    { name: "pixel-5", use: { ...devices["Pixel 5"] } },
    {
      name: "iphone-se",
      use: { ...devices["iPhone SE"], browserName: "chromium" },
    },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm start",
    url: "http://localhost:4200",
    reuseExistingServer: !process.env["CI"],
    timeout: 240_000,
  },
});
