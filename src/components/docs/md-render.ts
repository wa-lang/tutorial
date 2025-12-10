import { fromHighlighter } from '@shikijs/markdown-it'
import MarkdownIt from 'markdown-it'
import { getShiki } from '../../monaco/shiki'

export async function readMD(path: string): Promise<string> {
  const res = await fetch(path).then(res => res.text())
  return res
}

function parseCodeCompare(content: string) {
  const sections = { wa: '', go: '', js: '' }

  const waMatch = content.match(/<wa>([\s\S]*?)<\/wa>/)
  const goMatch = content.match(/<go>([\s\S]*?)<\/go>/)
  const jsMatch = content.match(/<js>([\s\S]*?)<\/js>/)

  if (waMatch)
    sections.wa = waMatch[1].trim()
  if (goMatch)
    sections.go = goMatch[1].trim()
  if (jsMatch)
    sections.js = jsMatch[1].trim()

  return sections
}

function codeComparePlugin(md: MarkdownIt) {
  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const info = token.info.trim()

    if (info === 'code-compare') {
      const { wa, go, js } = parseCodeCompare(token.content)
      const id = `code-compare-${Math.random().toString(36).substr(2, 9)}`

      return `<div class="code-compare-wrapper" data-id="${id}" data-wa="${encodeURIComponent(wa)}" data-go="${encodeURIComponent(go)}" data-js="${encodeURIComponent(js)}"></div>`
    }

    return defaultFence(tokens, idx, options, env, slf)
  }
}

export async function renderMD() {
  const md = MarkdownIt()
  const highlighter = await getShiki()

  md.use(codeComparePlugin)
  md.use(fromHighlighter(highlighter, {
    theme: 'vitesse-dark',
  }))

  return md
}
