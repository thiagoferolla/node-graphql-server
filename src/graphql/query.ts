import { queryType, stringArg } from '@nexus/schema';
import { usersLoader, transactionsLoader } from '../database/loaders';
import { requireUser } from '../server/auth';

export const Query = queryType({
  definition(t) {
    t.field('user', {
      type: 'User',
      args: {
        id: stringArg({ required: true })
      },

      resolve: async (_, args, ctx) => {
        const currentUser = requireUser(ctx);
        const user = await usersLoader.load(args.id);

        if (!user || user.id !== currentUser.id) {
          throw new Error('not authorized');
        }

        return user;
      }
    });

    t.field('transaction', {
      type: 'Transaction',
      args: {
        id: stringArg({ required: true })
      },

      resolve: async (_, args, ctx) => {
        const currentUser = requireUser(ctx);
        const transaction = await transactionsLoader.load(args.id);

        if (!transaction || transaction.owner !== currentUser.id) {
          throw new Error('not authorized');
        }

        return transaction;
      }
    });
  }
});
