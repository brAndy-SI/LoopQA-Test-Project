import { readFileSync } from 'fs';
import { resolve } from 'path';

export const loadTestCases = (): any[] => {
    const filePath = resolve(__dirname, '../data/testCases.json');
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
