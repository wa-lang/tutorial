import { useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useWaMonaco } from '@/hooks/useWaMonaco'
import { runWa } from '@/lib/wawasm'
import { monacoConfig } from '@/monaco/config'
import { useConfigStore } from '@/stores/config'
import { useTutorialStore } from '@/stores/tutorial'
import Editor from '@monaco-editor/react'
import { SkeletonCode } from '../skeleton-code'

export function EditorPane() {
  const monaco = useWaMonaco()
  const { theme } = useConfigStore()
  const { code } = useTutorialStore()
  const monacoTheme = theme === 'dark' ? 'vitesse-dark' : 'vitesse-light'

  const handleRunWaCode = useDebounce((value: string) => {
    window.__WA_CODE__ = value || ''
    runWa()
  }, 200)

  useEffect(() => {
    window.__WA_CODE__ = code || ''
    runWa()
  }, [code])


  return (
    <div className="h-full">
      <div className="px-4 py-2 border-b border-dashed flex gap-2 items-center">
        main.wa
      </div>
      <div className="h-full w-full">
        <Editor
          loading={<SkeletonCode/>}
          language="wa"
          {...monaco}
          height="100%"
          theme={monacoTheme}
          options={monacoConfig}
          value={code}
          onChange={handleRunWaCode}
        />
      </div>
    </div>
  )
}
