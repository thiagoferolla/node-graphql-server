import schema from '../graphql';
import { GraphQLServer } from 'graphql-yoga';
import { parseUser } from './auth';

const port = process.env.PORT || 8080;

const server = new GraphQLServer({
  // @ts-ignore
  schema,
  context: (req) => parseUser(req.request.headers.authorization)
});

server.start({ port }, () => {
  console.log(`listening port ${port}`);
});
