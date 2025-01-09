import { useWaMonaco } from '@/hooks/useWaMonaco'
import Editor from '@monaco-editor/react'
import { useTheme } from '../ui/theme-provider'

export function EditorPane() {
  const monaco = useWaMonaco()
  const { theme } = useTheme()

  return (
    <div className="h-full">
      <div className="px-4 py-2 border-b border-dashed flex gap-2 items-center">
        main.wa
      </div>
      <div className="h-full w-full">
        <Editor
          {...monaco}
          height="100%"
          theme={theme === 'dark' ? 'vitesse-dark' : 'vitesse-light'}
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
