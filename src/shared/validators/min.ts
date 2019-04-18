import { ValidationFn } from './types';
import { isEmptyInputValue } from './is-empty-input-value';

export function min(
  minValue: number,
  including: boolean = false,
): ValidationFn {
  return (value) => {
    if (
      !isEmptyInputValue(value) &&
      (including ? value <= minValue : value < minValue)
    ) {
      return {
        min: true,
      };
    }

    return null;
  };
}
