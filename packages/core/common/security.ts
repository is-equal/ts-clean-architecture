export interface Security {
  encryptPassword(value: string): string;

  encodeToken<T extends object>(data: T): string;

  decodeToken<T extends object>(token: string): T;
}
