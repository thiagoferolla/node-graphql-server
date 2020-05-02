import { queryType, stringArg } from '@nexus/schema';
import { usersLoader, transactionsLoader } from '../database/loaders';

export const Query = queryType({
  definition(t) {
    t.field('user', {
      type: 'User',
      args: {
        id: stringArg({ required: true })
      },

      resolve: (_, args) => usersLoader.load(args.id)
    });

    t.field('transaction', {
      type: 'Transaction',
      args: {
        id: stringArg({ required: true })
      },

      resolve: (_, args) => transactionsLoader.load(args.id)
    });
  }
});
