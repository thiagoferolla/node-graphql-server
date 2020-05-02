// eslint-disable-next-line no-unused-vars
import * as Knex from 'knex';
import { onUpdateTrigger } from '../knexfile';

export async function up(knex: Knex): Promise<any> {
  knex.schema
    .createTable('users', (table) => {
      table.string('id').primary().unique();
      table.string('name').nullable();
      table.string('email').unique();
      table.string('password').notNullable();
      table.string('push_token').nullable();
      table.integer('loginAttempts').defaultTo(0);

      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger('users'))).catch(console.error);
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
