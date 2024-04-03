import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const wait = (time: number) => new Promise(res => setTimeout(res, time))

export const setColorForExpirationDay = (date: Date) => {
  const days = Math.floor(date.getTime() - Date.now()) / 1000 / 60 / 60;
  if (days < 0) return "text-gray-500 dark:text-gray-300";
  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-500 dark:text-green-400"
}