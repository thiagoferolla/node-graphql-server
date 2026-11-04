/* eslint-disable camelcase */
export interface UserRow {
  id: string;
  name?: string | null;
  email: string;
  password: string;
  push_token?: string | null;
  loginAttempts: number;
  created_at: string;
  updated_at: string;
}
