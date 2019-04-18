export interface ValidationErrors {
  [key: string]: string | boolean;
}

export type ValidationFn = (value, allValues) => ValidationErrors | null;
