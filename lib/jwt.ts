import env from '@/lib/env';
import jwt from 'jsonwebtoken';

const SECRET_KEY = env.TOKEN_SECRET;
const EXPIRE_IN = env.TOKEN_EXPIRE_IN;

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function generateToken(payload: string | Buffer | Object): string {
  // @ts-expect-error
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRE_IN });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function decodeToken(token: string): Object | null {
  return jwt.decode(token);
}
