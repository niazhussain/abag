import { ValidationFn } from './types';
import { isEmptyInputValue } from './is-empty-input-value';

export const required: ValidationFn = (value) => {
  return isEmptyInputValue(value) ? { required: true } : null;
};
