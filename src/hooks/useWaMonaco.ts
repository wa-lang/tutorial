import { langConfig, monacoConfig } from '@/monaco/config'
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
    monaco.languages.setLanguageConfiguration('wa', langConfig)
    registerLangHighlighter(monaco)
  }, [monaco])

  return { ...monacoConfig, ...monaco }
}
