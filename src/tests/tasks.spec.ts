import { test } from '@playwright/test';
import { login } from '../framework/steps/loginSteps';
import { verifyTask } from '../framework/steps/taskSteps';
import { loadTestCases } from '../utils/dataLoader';
import { CREDENTIALS } from '../data/constants';

const testCases = loadTestCases();

test.describe('Task Management Tests', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, CREDENTIALS.username, CREDENTIALS.password);
    });

    testCases.forEach(({ app, task, column, tags }) => {
        test(`Verify task "${task}" in "${app}" is in column "${column}"`, async ({ page }) => {
            await verifyTask(page, app, task, column, tags);
        });
    });
});