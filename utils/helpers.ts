/**
 * Capitalize first letter in string.
 */
export const capitalize = (string: string): string =>
  string ? string[0].toUpperCase() + string.slice(1) : string;
