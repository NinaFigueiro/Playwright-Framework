// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 3,
  /* Run tests in files in parallel */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        trace: 'on',
        headless: false,
        screenshot: 'on', 
        
        
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        trace: 'on',
        headless: false,
        screenshot: 'on',
        // viewport: {width:720, height:720}
      }
    }
  ]
});

