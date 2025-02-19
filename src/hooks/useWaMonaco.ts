import { langConfig } from '@/monaco/config'
import { getShiki } from '@/monaco/shiki'
import { useMonaco } from '@monaco-editor/react'
import { shikiToMonaco } from '@shikijs/monaco'
import { useEffect } from 'react'

export function useWaMonaco() {
  const monaco = useMonaco()

  const registerLangHighlighter = async (monaco: typeof useMonaco) => {
    const highlighter = await getShiki()
    shikiToMonaco(highlighter, monaco)
  }

  useEffect(() => {
    if (!monaco)
      return

    monaco.languages.register({ id: 'wa' })
    monaco.languages.register({ id: 'wasm' })
    monaco.languages.setLanguageConfiguration('wa', langConfig)
    monaco.languages.setLanguageConfiguration('wasm', langConfig)

    registerLangHighlighter(monaco)
  }, [monaco])

  return { language: 'wa', ...monaco }
}
