// eslint-disable-next-line no-unused-vars
import * as Knex from 'knex';
import { onUpdateTrigger } from '../knexfile';

export async function up(knex: Knex): Promise<any> {
  knex.schema
    .createTable('transactions', (table) => {
      table.string('id').primary().unique();
      table.string('title').notNullable();
      table.string('description').nullable();
      table.enum('type', ['earning', 'expense']).defaultTo('expense');
      table
        .string('owner')
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE');
      table.float('value').notNullable();
      table.timestamp('date').notNullable();
      table.string('currency').notNullable();
      table.string('category').nullable();

      table.timestamps(true, true);
    })
    .then(() => onUpdateTrigger('transactions'));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('transactions');
}
