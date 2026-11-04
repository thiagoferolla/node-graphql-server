import * as Knex from 'knex';
// eslint-disable-next-line no-unused-vars
import { UserRow } from '../types';
import * as bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<any> {
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex<UserRow>('users').insert([{
        id: '1',
        name: 'Thiago Ferolla',
        email: 'thiagofunascimento@gmail.com',
        password: bcrypt.hashSync('123456', 10)
      }]);
    });
};
