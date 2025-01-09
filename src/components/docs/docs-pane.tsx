import tocData from '@/constants/toc.json'
import { convertTocToMenuItems } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { readMD, renderMD } from './md-render'
import Pag from './pag'
import Toc from './toc.tsx'
import './md.css'

export function DocsPane() {
  const [lang, _] = useState<'en' | 'zh'>('zh')
  const [toc, setToc] = useState<any[]>([])
  const [doc, setDoc] = useState('')
  const [curPath, setCurPath] = useState('')

  const getAllItems = () => toc.flatMap(category => category.items || [])

  useEffect(() => {
    const items = convertTocToMenuItems(tocData as any, lang) as any
    const firstItem = items[0]?.items[0]
    setToc(items)
    setCurPath(firstItem?.value || '')
  }, [lang])

  const navigation = {
    getCurIdx: () => getAllItems().findIndex(item => item.value === curPath),
    updatePath: (index: number) => {
      const allItems = getAllItems()
      if (index >= 0 && index < allItems.length) {
        setCurPath(allItems[index].value)
      }
    },
    getNavItems: () => {
      const curIdx = navigation.getCurIdx()
      const allItems = getAllItems()
      return {
        prev: curIdx > 0 ? allItems[curIdx - 1] : null,
        next: curIdx < allItems.length - 1 ? allItems[curIdx + 1] : null,
      }
    },
    onPrev: () => navigation.updatePath(navigation.getCurIdx() - 1),
    onNext: () => navigation.updatePath(navigation.getCurIdx() + 1),
  }

  useEffect(() => {
    if (!curPath)
      return

    const loadDocument = async () => {
      const md = await renderMD()
      const content = await readMD(`docs/${curPath}`)
      setDoc(md.render(content))

      const container = document.querySelector('.doc-container')
      if (container) {
        container.scrollTop = 0
      }
    }

    loadDocument()
  }, [curPath])

  return (
    <div className="h-full flex flex-col">
      <Toc
        items={toc}
        curIdx={navigation.getCurIdx()}
        curPath={curPath}
        onChange={setCurPath}
        onPrev={navigation.onPrev}
        onNext={navigation.onNext}
      />
      <div className="doc-container flex-1 overflow-auto px-6">
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: doc }} />
        <Pag
          prev={navigation.getNavItems().prev}
          next={navigation.getNavItems().next}
          onPrev={navigation.onPrev}
          onNext={navigation.onNext}
          curIdx={navigation.getCurIdx()}
          total={getAllItems().length}
        />
      </div>
    </div>
  )
}
