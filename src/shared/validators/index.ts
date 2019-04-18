import { ValidationFn } from './types';

export { required } from './required';
export { min } from './min';
export { max } from './max';

export function combineValidators(validators: ValidationFn[]): ValidationFn {
  return (value, allFields) => {
    for (const validator of validators) {
      const val = validator(value, allFields);

      if (val !== null) {
        return val;
      }
    }

    return null;
  };
}

export function setValidationMessagesOnFirstError(messages, validator) {
  return (value, allFields) => {
    const error = validator(value, allFields);

    if (error === null) {
      return error;
    } else {
      return messages[Object.keys(error)[0]];
    }
  };
}
