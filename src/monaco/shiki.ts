import type { LanguageRegistration } from 'shiki'
import { bundledLanguages, createHighlighter } from 'shiki'
import wa from './wa.tmLanguage.json'

const wasm = bundledLanguages.wasm
const zsh = bundledLanguages.zsh

export async function getShiki() {
  const highlighter = await createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: [wasm, zsh, wa as unknown as LanguageRegistration],
  })

  return highlighter
}
