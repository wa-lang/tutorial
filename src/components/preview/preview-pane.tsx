import { useWaMonaco } from '@/hooks/useWaMonaco'
import { initWaWasm } from '@/lib/wawasm'
import { useConfigStore } from '@/stores/config'
import { useWasmStore } from '@/stores/wasm'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MemoryPreview } from './memory'
import { OutputPreview } from './output'
import { WatPreview } from './wat'

export function PreviewPane() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'output' | 'wat' | 'memory'>('output')
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
          className={`px-2 py-1 ${activeTab === 'output' ? 'bg-foreground/5' : ''}`}
          onClick={() => setActiveTab('output')}
        >
          Preview
        </button>
        <button
          className={`px-2 py-1 ${activeTab === 'wat' ? 'bg-foreground/5' : ''}`}
          onClick={() => setActiveTab('wat')}
        >
          WAT
        </button>
        <button
          className={`px-2 py-1 ${activeTab === 'memory' ? 'bg-foreground/5' : ''}`}
          onClick={() => setActiveTab('memory')}
        >
          Memory
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
                : activeTab === 'wat'
                  ? <WatPreview wat={wat} monaco={monaco} theme={theme} />
                  : <MemoryPreview />}
            </div>
          )}
    </div>
  )
}
