import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidAvatar = (value?: string | null): boolean => {
  return !!value && value.trim() !== '' && value !== 'null' && value !== 'undefined'
}
