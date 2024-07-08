import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const takeUri = (Url: string) : string => {
  const originalURL = new URL(Url);
  return originalURL.pathname;
}