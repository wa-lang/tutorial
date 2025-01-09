import type { LanguageRegistration } from 'shiki'
import { createHighlighter } from 'shiki'
import wa from './wa.tmLanguage.json'

export async function getShiki() {
  const highlighter = await createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: [wa] as unknown as LanguageRegistration[],
  })

  return highlighter
}
