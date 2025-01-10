import { useWaMonaco } from '@/hooks/useWaMonaco'
import { monacoConfig } from '@/monaco/config'
import { useConfigStore } from '@/stores/config'
import Editor from '@monaco-editor/react'

export function EditorPane() {
  const monaco = useWaMonaco()
  const { theme } = useConfigStore()
  const monacoTheme = theme === 'dark' ? 'vitesse-dark' : 'vitesse-light'

  return (
    <div className="h-full">
      <div className="px-4 py-2 border-b border-dashed flex gap-2 items-center">
        main.wa
      </div>
      <div className="h-full w-full">
        <Editor
          {...monaco}
          height="100%"
          theme={monacoTheme}
          options={monacoConfig}
          defaultValue={`// 版权 @2019 凹语言 作者。保留所有权利。

func main {
  a := 0.0
  for y := 1.5; y > -1.5; y = y - 0.15 {
    for x := -1.5; x < 1.5; x = x + 0.07 {
      a = x*x + y*y - 1.0
      if a*a*a < x*x*y*y*y {
        print("@")
      } else {
        print(" ")
      }
    }
    println()
  }
}`}
        />
      </div>
    </div>
  )
}
