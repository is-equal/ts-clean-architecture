import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Security } from '../../core/common/security';

export class CustomSecurity implements Security {
  private readonly TOKEN_SECRET = 'YOUR_TOKEN_SECRET';

  encryptPassword(value: string): string {
    const hash = crypto.createHash('sha256');

    hash.update(value);

    return hash.digest('hex');
  }

  validateToken(token: string): boolean {
    return jwt.verify(token, this.TOKEN_SECRET) !== null;
  }

  encodeToken<T extends object>(data: T): string {
    return jwt.sign(data, this.TOKEN_SECRET);
  }

  decodeToken<T extends object>(token: string): T {
    const value = jwt.decode(token) as object;

    if (Object.keys(value).length === 0) {
      throw new Error('empty token');
    }

    return value as T;
  }
}
