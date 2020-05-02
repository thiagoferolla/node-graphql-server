import * as Knex from 'knex';
import { NexusGenRootTypes } from '../../graphql/__generated__/types';
import * as bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<any> {
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex<NexusGenRootTypes['User']>('users').insert([{
        id: '1',
        name: 'Thiago Ferolla',
        email: 'thiagofunascimento@gmail.com',
        password: bcrypt.hashSync('123456', 10)
      }]);
    });
};
