import { makeSchema } from '@nexus/schema';
import { Node } from './node';
import { Transaction, TransactionType } from './transaction';
import { User } from './user';
import * as path from 'path';
import { Query } from './query';
import { AuthPayload, Mutation } from './mutation';

const schema = makeSchema({
  types: [Node, User, Transaction, TransactionType, Query, AuthPayload, Mutation],
  outputs: {
    typegen: path.join(__dirname, '/__generated__/types.d.ts')
  }
});

export default schema;
