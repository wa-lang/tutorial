import { initWaWasm } from '@/lib/wawasm'
import { useWasmStore } from '@/stores/wasm'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export function PreviewPane() {
  const [loading, setLoading] = useState(true)
  const { output } = useWasmStore()

  useEffect(() => {
    initWaWasm().then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="h-full">
      <div className="px-4 py-2 border-b border-dashed flex gap-2 items-center">Preview</div>
      {loading
        ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          )
        : (
            <pre className="h-full w-full p-4 text-xs">
              {output || '暂无输出'}
            </pre>
          )}
    </div>
  )
}
