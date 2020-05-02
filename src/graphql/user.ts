import { objectType } from '@nexus/schema';
import { Node } from './node';
import { userTransactionsLoader } from '../database/loaders';

export const User = objectType({
  name: 'User',

  definition(t) {
    t.implements(Node);

    t.string('name', { nullable: true });
    t.string('email', { nullable: false });

    t.string('password', { nullable: false });
    t.string('push_token', { nullable: true });
    t.int('loginAttempts', { nullable: false });

    t.list.field('transactions', {
      type: 'Transaction',
      resolve: (r) => {
        return userTransactionsLoader.load(r.id);
      }
    });

    t.string('created_at');
    t.string('updated_at');
  }
});
