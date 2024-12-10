import {config} from 'dotenv';
config();

export const CREDENTIALS = {
    username: process.env.LOGIN || 'defaultUser',
    password: process.env.PASSWORD || 'defaultPassword',
};
