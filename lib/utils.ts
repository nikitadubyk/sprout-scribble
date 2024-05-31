import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

/**
 * Function to merge tailwind classes
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
