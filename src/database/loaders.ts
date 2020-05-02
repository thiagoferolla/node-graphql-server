import DataLoader from 'dataloader';
import client from './index';
// eslint-disable-next-line no-unused-vars
import { NexusGenRootTypes } from '../graphql/__generated__/types';

export const usersLoader = new DataLoader(async (keys: readonly string[]) => {
  const results = await client<NexusGenRootTypes['User']>('users').whereIn('id', keys).orWhereIn('email', keys).select('*');

  return keys.map(key => {
    try {
      return results.filter((r: NexusGenRootTypes['User']) => r.id === key || r.email === key)[0];
    } catch (err) {
      return new Error(`No result for ${key}`);
    }
  });
});

export const userTransactionsLoader = new DataLoader(async (keys: readonly string[]) => {
  const results = await client<NexusGenRootTypes['Transaction']>('transactions').whereIn('owner', keys).select('*');

  return keys.map(key => {
    try {
      const userTransactions = results.filter((r: NexusGenRootTypes['Transaction']) => r.owner === key);

      if (!userTransactions.length) {
        return new Error(`No result for ${key}`);
      }

      return userTransactions;
    } catch (err) {
      return new Error(`No result for ${key}`);
    }
  });
});

export const transactionsLoader = new DataLoader(async (keys: readonly string[]) => {
  const results = await client<NexusGenRootTypes['Transaction']>('transactions').whereIn('id', keys).select('*');

  return keys.map(key => {
    try {
      return results.filter((r: NexusGenRootTypes['Transaction']) => r.id === key)[0];
    } catch (err) {
      return new Error(`No result for ${key}`);
    }
  });
});
