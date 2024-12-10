import { Page } from '@playwright/test';
import { TaskElement } from '../elements/taskElement';

export class TaskPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToApp(appName: string): Promise<void> {
        await this.page.click(`text=${appName}`);
    }

    getTask(taskName: string): TaskElement {
        return new TaskElement(this.page, taskName);
    }
}