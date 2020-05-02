import { mutationType, objectType, stringArg, floatArg, arg } from '@nexus/schema';
import client from '../database';
// @ts-ignore
import { NexusGenRootTypes } from './__generated__/types';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { usersLoader, transactionsLoader } from '../database/loaders';
import { v4 as uuid } from 'uuid';

const jwtSecret = process.env.JWT_SECRET || 'TEST_SECRET';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token', { nullable: false });
    t.field('user', { type: 'User' });
  }
});

export const Mutation = mutationType({
  definition(t) {
    t.field('signUp', {
      type: AuthPayload,
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false })
      },
      resolve: async (_, args) => {
        const { name, email, password } = args;
        const newUserID = uuid();
        (await client<NexusGenRootTypes['User']>('users').insert({
          id: newUserID,
          name,
          email,
          password: bcrypt.hashSync(password, 10)
        }).returning('*'));

        const user = await usersLoader.load(newUserID);

        const token = jwt.sign({ id: user.id }, jwtSecret);

        return {
          token,
          user
        };
      }
    });

    t.field('signIn', {
      type: AuthPayload,
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false })
      },
      resolve: async (_, args, ctx) => {
        const user = await usersLoader.load(args.email);

        const passwordCorrect = await bcrypt.compare(args.password, user.password);

        if (!passwordCorrect) {
          await client<NexusGenRootTypes['User']>('users').where('email', args.email).update({ loginAttempts: user.loginAttempts + 1 });

          throw new Error('incorrect password');
        };

        const token = jwt.sign({ id: user.id }, jwtSecret);

        return {
          token,
          user
        };
      }
    });

    t.field('deleteUser', {
      type: 'Boolean',
      resolve: async (_, args, context) => {
        const { id } = context;

        const deleted = (await client<NexusGenRootTypes['User']>('users').where('id', id).delete().returning('*'))[0];

        if (deleted) {
          return true;
        }

        throw new Error('unable to delete user');
      }
    });

    t.field('createTransaction', {
      type: 'Transaction',
      args: {
        title: stringArg({ required: true }),
        description: stringArg({ required: false }),
        type: arg({ type: 'TransactionType', required: true }),
        value: floatArg({ required: true }),
        date: stringArg({ required: true }),
        category: stringArg({ required: false })
      },
      resolve: async (_, args, context) => {
        if (!context.id) {
          return new Error('user not authenticated');
        }

        const transactionID = uuid();
        const transaction = (await client<NexusGenRootTypes['Transaction']>('transactions').insert({
          ...args,
          id: transactionID,
          owner: context.id
        }).returning('*'))[0];

        if (transaction) {
          const newTransaction = await transactionsLoader.load(transactionID);

          return newTransaction;
        }

        return new Error('unable to create transaction');
      }
    });

    t.field('editTransaction', {
      type: 'Transaction',
      args: {
        transactionID: stringArg({ required: true }),
        title: stringArg({ required: false }),
        description: stringArg({ required: false }),
        type: arg({ type: 'TransactionType', required: false }),
        value: floatArg({ required: false }),
        date: stringArg({ required: false }),
        category: stringArg({ required: false })
      },
      resolve: async (_, args, context) => {
        if (!context.id) {
          return new Error('user not authenticated');
        }

        try {
          const fields = { ...args, updated_at: Date.now() };

          const transaction = (await client<NexusGenRootTypes['Transaction']>('transactions').where({ id: args.transactionID, owner: context.id }).update(fields).returning('*'))[0];

          return transaction;
        } catch (err) {
          return new Error('unable to edit transaction');
        }
      }
    });

    t.field('deleteTransaction', {
      type: 'Transaction',
      args: {
        transactionID: stringArg({ required: true })
      },
      resolve: async (_, args, context) => {
        if (!context.id) {
          return new Error('user not authenticated');
        }

        try {
          const deleted = (await client<NexusGenRootTypes['Transaction']>('transactions').where({ id: args.transactionID, owner: context.id }).delete().returning('*'))[0];

          if (deleted) {
            return true;
          }

          return new Error('unable to delete transaction');
        } catch (err) {
          return new Error('unable to delete transaction');
        }
      }
    });
  }
});
