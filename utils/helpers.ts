/**
 * Capitalize first letter in string.
 */
export const capitalize = (string: string): string =>
  string ? string[0].toUpperCase() + string.slice(1) : string;

/**
 * Join strings array in one string.
 */
export const joinStrings = (
  values: (string | null)[],
  separator: string,
  placeholder?: string
): string => {
  const data = values.filter((value) => value && value?.length > 0) as string[];
  return data.length === 0 ? placeholder ?? "" : data.join(separator);
};

/**
 * Retrieves the base URL of the application.
 */
export const getBaseURL = () => {
  if (typeof window !== "undefined") return;
  if (process.env.VERCEL_URL) return `https://${process.env.DOMAIN_URL}`;
};
