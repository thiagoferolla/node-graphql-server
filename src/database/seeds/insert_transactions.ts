import * as Knex from 'knex';
import { NexusGenRootTypes } from '../../graphql/__generated__/types';

export async function seed(knex: Knex): Promise<any> {
  return knex('transactions').del()
    .then(() => {
      // Inserts seed entries
      return knex<NexusGenRootTypes['Transaction']>('transactions').insert([{
        id: 't-1',
        title: 'First transaction',
        description: 'this is a test transaction',
        owner: '1',
        type: 'earning',
        value: 100,
        currency: 'USD',
        date: (new Date()).toISOString()
      }, {
        id: 't-2',
        title: 'First expense transaction',
        description: 'this is a test transaction',
        owner: '1',
        type: 'expense',
        value: 50,
        currency: 'USD',
        date: (new Date()).toISOString()
      }]);
    });
};
