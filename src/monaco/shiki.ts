import type { LanguageRegistration } from 'shiki'
import { bundledLanguages, createHighlighter } from 'shiki'
import wa from './wa.tmLanguage.json'

const wasm = bundledLanguages.wasm

export async function getShiki() {
  const highlighter = await createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: [wasm, wa as unknown as LanguageRegistration],
  })

  return highlighter
}
