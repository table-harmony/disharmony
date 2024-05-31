import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidObjectId(s: string): boolean {
  if (s.length !== 24) return false;

  const hexRegex = /^[0-9A-Fa-f]{24}$/;
  return hexRegex.test(s);
}

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
  SYSTEM = "system",
}
