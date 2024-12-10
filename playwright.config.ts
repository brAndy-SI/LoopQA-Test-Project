import { defineConfig } from '@playwright/test';
const browsers = (process.env.BROWSERS || 'chromium').split(',');
const isHeadless = process.env.HEADLESS !== 'false';

let acceptableBrowsers = ['chromium', 'firefox', 'webkit']
browsers.forEach((browser) => {
    if (!acceptableBrowsers.includes(browser.trim())){
        throw Error(`Browser with name ${browser} isn't acceptable.\nSee acceptable browsers here: ${acceptableBrowsers}`)
    }
})

const projects = browsers.map((browser) => ({
    name: browser.trim(),
    use: {
        browserName: browser.trim() as 'chromium' | 'firefox' | 'webkit',
        headless: isHeadless,
        viewport: { width: 1280, height: 720 },
    },
}));

export default defineConfig({
    projects,
    testDir: './src/tests',
    timeout: 5000,
    retries: 1,
    use: {
        headless: true,
        baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app',
        trace: 'on-first-retry',
    },
  reporter: [['list'], ['allure-playwright', { outputFolder: 'allure-results' }]],
});