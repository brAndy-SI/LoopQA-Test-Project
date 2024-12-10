import { Page, test } from '@playwright/test';

export const login = async (page: Page, username: string, password: string): Promise<void> => {
    await test.step('Navigate to login page', async () => {
        await page.goto('/');
    });

    await test.step('Fill in login credentials', async () => {
        await page.fill('input[id="username"]', username);
        await page.fill('input[id="password"]', password);
    });

    await test.step('Click login button and wait for dashboard', async () => {
        await page.click('button:has-text("Sign in")');
        await page.waitForSelector('text=Web Application');
        await page.waitForSelector('text=Logout');
    });
};