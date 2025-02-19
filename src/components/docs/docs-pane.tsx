import tocData from '../../../public/toc.json'
import { convertTocToMenuItems } from '@/lib/utils'
import { useTutorialStore } from '@/stores/tutorial'
import { useEffect } from 'react'
import { readMD, renderMD } from './md-render'
import Pag from './pag'
import Toc from './toc.tsx'
import './md.css'

export function DocsPane() {
  const {
    toc,
    curPath,
    doc,
    lang,
    actions: {
      updateToc,
      updateCurPath,
      updateDoc,
      getCurIdx,
      getNavItems,
      updatePathByIndex,
      getAllItems,
      updateCode,
    },
  } = useTutorialStore()

  useEffect(() => {
    const items = convertTocToMenuItems(tocData as any, lang) as any
    updateToc(items)
    if (!curPath) {
      const firstItem = items[0]?.items[0]
      updateCurPath(firstItem?.value || '')
    }
  }, [lang])

  useEffect(() => {
    if (!curPath)
      return

    const loadDocument = async () => {
      const md = await renderMD()
      const content = await readMD(`docs/${curPath}`)
      updateDoc(md.render(content))

      const container = document.querySelector('.doc-container')
      if (container) {
        container.scrollTop = 0
      }
    }

    const loadCode = async () => {
      const pathParts = curPath.split('/')
      const item = toc
        .find(item => item.group === pathParts[1])?.items
        ?.find((item: any) => item.value === curPath)
      updateCode(item?.code || '')
    }

    loadDocument()
    loadCode()
  }, [curPath])

  const onPrev = () => updatePathByIndex(getCurIdx() - 1)
  const onNext = () => updatePathByIndex(getCurIdx() + 1)
  const navItems = getNavItems()

  return (
    <div className="h-full flex flex-col">
      <Toc
        items={toc}
        curIdx={getCurIdx()}
        curPath={curPath}
        onChange={updateCurPath}
        onPrev={onPrev}
        onNext={onNext}
      />
      <div className="doc-container flex-1 overflow-auto px-6">
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: doc }} />
        <Pag
          prev={navItems.prev}
          next={navItems.next}
          onPrev={onPrev}
          onNext={onNext}
          curIdx={getCurIdx()}
          total={getAllItems().length}
        />
      </div>
    </div>
  )
}
