import type { LanguageRegistration } from 'shiki'
import { bundledLanguages, createHighlighter } from 'shiki'
import waGrammar from './wa.tmLanguage.json'

const wasm = bundledLanguages.wasm
const zsh = bundledLanguages.zsh

export async function getShiki(defaultTheme: 'light' | 'dark' = 'light') {
  const themes = defaultTheme === 'light'
    ? ['vitesse-light', 'vitesse-dark']
    : ['vitesse-dark', 'vitesse-light']

  const highlighter = await createHighlighter({
    themes,
    langs: [wasm, zsh, waGrammar as unknown as LanguageRegistration],
  })

  return highlighter
}
