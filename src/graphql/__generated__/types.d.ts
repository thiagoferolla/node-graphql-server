/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  TransactionType: "earning" | "expense"
}

export interface NexusGenRootTypes {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Query: {};
  Transaction: { // root type
    category?: string | null; // String
    created_at: string; // String!
    currency: string; // String!
    date: string; // String!
    description?: string | null; // String
    id: string; // ID!
    owner: string; // String!
    title: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updated_at: string; // String!
    value: number; // Float!
  }
  User: { // root type
    created_at: string; // String!
    email: string; // String!
    id: string; // ID!
    loginAttempts: number; // Int!
    name?: string | null; // String
    password: string; // String!
    push_token?: string | null; // String
    updated_at: string; // String!
  }
  Node: NexusGenRootTypes['Transaction'] | NexusGenRootTypes['User'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  TransactionType: NexusGenEnums['TransactionType'];
}

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    createTransaction: NexusGenRootTypes['Transaction']; // Transaction!
    deleteTransaction: NexusGenRootTypes['Transaction']; // Transaction!
    deleteUser: boolean; // Boolean!
    editTransaction: NexusGenRootTypes['Transaction']; // Transaction!
    signIn: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    signUp: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Query: { // field return type
    transaction: NexusGenRootTypes['Transaction']; // Transaction!
    user: NexusGenRootTypes['User']; // User!
  }
  Transaction: { // field return type
    category: string | null; // String
    created_at: string; // String!
    currency: string; // String!
    date: string; // String!
    description: string | null; // String
    id: string; // ID!
    owner: string; // String!
    title: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updated_at: string; // String!
    user: NexusGenRootTypes['User']; // User!
    value: number; // Float!
  }
  User: { // field return type
    created_at: string; // String!
    email: string; // String!
    id: string; // ID!
    loginAttempts: number; // Int!
    name: string | null; // String
    password: string; // String!
    push_token: string | null; // String
    transactions: NexusGenRootTypes['Transaction'][]; // [Transaction!]!
    updated_at: string; // String!
  }
  Node: { // field return type
    id: string; // ID!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTransaction: { // args
      category?: string | null; // String
      currency: string; // String!
      date: string; // String!
      description?: string | null; // String
      title: string; // String!
      type: NexusGenEnums['TransactionType']; // TransactionType!
      value: number; // Float!
    }
    deleteTransaction: { // args
      transactionID: string; // String!
    }
    editTransaction: { // args
      category?: string | null; // String
      currency?: string | null; // String
      date?: string | null; // String
      description?: string | null; // String
      title?: string | null; // String
      transactionID: string; // String!
      type?: NexusGenEnums['TransactionType'] | null; // TransactionType
      value?: number | null; // Float
    }
    signIn: { // args
      email: string; // String!
      password: string; // String!
    }
    signUp: { // args
      email: string; // String!
      name?: string | null; // String
      password: string; // String!
    }
  }
  Query: {
    transaction: { // args
      id: string; // String!
    }
    user: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  Node: "Transaction" | "User"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthPayload" | "Mutation" | "Query" | "Transaction" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = "TransactionType";

export type NexusGenInterfaceNames = "Node";

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}