import { Page } from '@playwright/test';

export class TaskElement {
    private page: Page;
    private taskName: string;

    constructor(page: Page, taskName: string) {
        this.page = page;
        this.taskName = taskName;
    }

    async getColumnName(): Promise<string> {
        const taskSelector = `text=${this.taskName}`;
        const columnSelector = `${taskSelector} >> xpath=../../..//h2`;
        const columnText = await this.page.locator(columnSelector).innerText();
        return columnText.replace(/\(\d+\)/g, '').trim();
    }

    async verifyColumn(expectedColumn: string): Promise<void> {
        const actualColumn = await this.getColumnName();
        if (actualColumn !== expectedColumn) {
            throw new Error(`Expected task "${this.taskName}" in column "${expectedColumn}", but found "${actualColumn}"`);
        }
    }

    async verifyTags(expectedTags: string[]): Promise<void> {
        for (const tag of expectedTags) {
            const tagSelector = `text=${this.taskName} >> xpath=..//span[contains(., "${tag}")]`;
            const isTagVisible = await this.page.isVisible(tagSelector);
            if (!isTagVisible) {
                throw new Error(`Tag "${tag}" not found for task "${this.taskName}"`);
            }
        }
    }
}