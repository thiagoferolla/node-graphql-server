import config from './knexfile';
import knex from 'knex';

const environment = process.env.ENVIRONMENT || 'development';

// @ts-ignore
export default knex(config[environment]);
