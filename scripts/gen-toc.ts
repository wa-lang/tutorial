import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, '..')
const DOCS_DIR = path.join(ROOT_DIR, 'docs')
const OUTPUT_FILE = path.join(ROOT_DIR, 'src/constants/toc.json')

interface ITocItem {
  title: string
  path: string
  children?: Record<string, ITocItem>
}

interface ITocStructure {
  [key: string]: ITocItem
}

function extractTitleFromMd(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const titleMatch = content.match(/^#\s+(.+)$/m)
    return titleMatch ? titleMatch[1] : path.basename(filePath, '.md')
  }
  catch {
    return path.basename(filePath, '.md')
  }
}

function genToc(dir: string, relativePath = ''): ITocStructure {
  const items: ITocStructure = {}
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const filteredEntries = entries.filter(entry =>
    !entry.name.startsWith('.')
    && entry.name !== 'code',
  )

  filteredEntries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name)
    const itemPath = path.join(relativePath, entry.name).replace(/\\/g, '/')
    const key = entry.name.replace(/\.md$/, '')

    if (entry.isFile() && entry.name.endsWith('.md')) {
      items[key] = {
        title: extractTitleFromMd(fullPath),
        path: itemPath,
      }
    }
    else if (entry.isDirectory()) {
      const children = genToc(fullPath, itemPath)
      if (Object.keys(children).length > 0) {
        items[entry.name] = {
          title: entry.name,
          path: itemPath,
          children,
        }
      }
    }
  })

  return items
}

const outputDir = path.dirname(OUTPUT_FILE)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const toc = genToc(DOCS_DIR)
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(toc, null, 2))
console.log('DOCS TOC generated successfully!')
