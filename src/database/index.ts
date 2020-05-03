import config from './knexfile';
import knex from 'knex';

const environment = process.env.NODE_ENV || 'development';

// @ts-ignore
export default knex(config[environment]);
