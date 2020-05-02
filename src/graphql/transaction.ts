import { objectType, enumType } from '@nexus/schema';
import { Node } from './node';
import { User } from './user';
import { usersLoader } from '../database/loaders';

export const TransactionType = enumType({
  name: 'TransactionType',
  members: ['earning', 'expense']
});

export const Transaction = objectType({
  name: 'Transaction',

  definition(t) {
    t.implements(Node);

    t.string('title', { nullable: false });
    t.string('description', { nullable: true });
    t.field('type', { type: TransactionType });
    t.string('owner', { nullable: false });
    t.field('user', {
      type: User,
      resolve: async (r) => {
        try {
          return usersLoader.load(r.owner);
        } catch (err) {
          throw new Error('');
        }
      }
    });
    t.float('value', { nullable: false });
    t.string('date', { nullable: false });
    t.string('category', { nullable: true });

    t.string('created_at');
    t.string('updated_at');
  }
});
