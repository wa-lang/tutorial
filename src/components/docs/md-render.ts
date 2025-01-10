import { fromHighlighter } from '@shikijs/markdown-it'
import MarkdownIt from 'markdown-it'
import { getShiki } from '../../monaco/shiki'

export async function readMD(path: string): Promise<string> {
  const res = await fetch(path).then(res => res.text())
  return res
}

export async function renderMD() {
  const md = MarkdownIt()
  const highlighter = await getShiki()
  md.use(fromHighlighter(highlighter, {
    theme: 'vitesse-dark',
  }))

  return md
}
