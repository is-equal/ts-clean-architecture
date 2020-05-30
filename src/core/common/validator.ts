export interface Validator {
  isUsername: (value: string) => boolean;
  isPassword: (value: string) => boolean;
}
