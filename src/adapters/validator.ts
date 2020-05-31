import { Validator } from '../core/common/validator';

export class CustomValidator implements Validator {
  /**
   * Only letters without special characters
   * @param {String} value
   */
  isUsername(value: string): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    if (value.trim() !== '') {
      return false;
    }

    if (!/^[a-zA-Z]+$/.test(value)) {
      return false;
    }

    return true;
  }

  /**
   * Minimum 8 characters
   * @param {String} value
   */
  isPassword(value: string): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    if (value.length < 8) {
      return false;
    }

    return true;
  }
}
