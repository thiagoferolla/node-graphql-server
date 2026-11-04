import { usersLoader } from '../database/loaders';
// eslint-disable-next-line no-unused-vars
import { UserRow } from '../database/types';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'TEST_SECRET';

export async function parseUser(authHeader: string | undefined) {
  try {
    if (!authHeader) {
      return null;
    }
    const [, token] = authHeader.split(' ');

    // @ts-ignore
    const { id } = jwt.verify(token, jwtSecret);

    return await usersLoader.load(id);
  } catch (err) {
    return null;
  }
}

export function requireUser(user: UserRow | null | undefined): UserRow {
  if (!user) {
    throw new Error('not authenticated');
  }

  return user;
}
