import { ValidationFn } from './types';
import { isEmptyInputValue } from './is-empty-input-value';

export function max(
  maxValue: number,
  including: boolean = false,
): ValidationFn {
  return (value) => {
    if (
      !isEmptyInputValue(value) &&
      (including ? value >= maxValue : value > maxValue)
    ) {
      return {
        max: true,
      };
    }

    return null;
  };
}
