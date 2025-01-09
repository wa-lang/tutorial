import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ITocItem {
  title: string
  children: { [key: string]: ITocChildItem }
}

export interface ITocChildItem {
  path: string
  title: string
}

export function convertTocToMenuItems(tocData: { [key: string]: { children: ITocItem[] } }, lang: 'en' | 'zh' = 'zh') {
  const data = tocData[lang].children
  return Object.entries(data).map(([_, value]: [string, ITocItem]) => ({
    group: value.title,
    items: Object.entries(value.children).map(([__, childValue]: [string, ITocChildItem]) => ({
      value: childValue.path,
      label: childValue.title,
    })).filter(item => !item.value.endsWith('/readme.md')),
  }))
}
