import { interfaceType } from '@nexus/schema';

export const Node = interfaceType({
  name: 'Node',

  definition(t) {
    t.id('id', { description: 'Unique identifier for the resource' });
    t.resolveType(() => null);
  }
});
