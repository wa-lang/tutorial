import type { FC } from 'react'
import { useWaMonaco } from '@/hooks/useWaMonaco'
import { initWaWasm } from '@/lib/wawasm'
import { monacoConfig } from '@/monaco/config'
import { useConfigStore } from '@/stores/config'
import { useWasmStore } from '@/stores/wasm'
import Editor from '@monaco-editor/react'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const OutputPreview: FC<{ output: string }> = ({ output }) => {
  return (
    <pre className="h-full w-full p-4 text-xs overflow-auto">
      {output || 'No output'}
    </pre>
  )
}

const WatPreview: FC<{
  wat: string | null
  monaco: ReturnType<typeof useWaMonaco>
  theme: 'dark' | 'light'
}> = ({ wat, monaco, theme }) => {
  const monacoTheme = theme === 'dark' ? 'vitesse-dark' : 'vitesse-light'

  return (
    <Editor
      language="wasm"
      {...monaco}
      options={{
        ...monacoConfig,
        readOnly: true,
        fontSize: 12,
      }}
      height="100%"
      theme={monacoTheme}
      value={wat || 'No WAT'}
    />
  )
}

export function PreviewPane() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'output' | 'wat'>('output')
  const { output, wat } = useWasmStore()

  const monaco = useWaMonaco()
  const { theme } = useConfigStore()

  useEffect(() => {
    initWaWasm().then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="h-full">
      <div className="px-2 py-1 border-b border-dashed flex gap-2 items-center">
        <button
          className={`px-2 py-1 rounded-sm ${activeTab === 'output' ? 'bg-foreground/5' : ''}`}
          onClick={() => setActiveTab('output')}
        >
          Preview
        </button>
        <button
          className={`px-2 py-1 rounded-sm ${activeTab === 'wat' ? 'bg-foreground/5' : ''}`}
          onClick={() => setActiveTab('wat')}
        >
          WAT
        </button>
      </div>
      {loading
        ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          )
        : (
            <div className="h-full w-full">
              {activeTab === 'output'
                ? <OutputPreview output={output} />
                : <WatPreview wat={wat} monaco={monaco} theme={theme} />}
            </div>
          )}
    </div>
  )
}
