import { Page, test } from '@playwright/test';
import { TaskPage } from '../pages/tasksPage';

export const verifyTask = async (
    page: Page,
    appName: string,
    taskName: string,
    expectedColumn: string,
    expectedTags: string[]
): Promise<void> => {
    await test.step(`Verify task "${taskName}" in app "${appName}"`, async () => {
        const taskPage = new TaskPage(page);

        await test.step(`Navigate to app "${appName}"`, async () => {
            await taskPage.navigateToApp(appName);
        });

        const task = await test.step(`Get task "${taskName}"`, async () => {
            return taskPage.getTask(taskName);
        });

        await test.step(`Verify task "${taskName}" is in column "${expectedColumn}"`, async () => {
            await task.verifyColumn(expectedColumn);
        });

        await test.step(`Verify tags for task "${taskName}"`, async () => {
            await task.verifyTags(expectedTags);
        });
    });
};