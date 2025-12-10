import { convertTocToMenuItems } from '@/lib/utils'
import { useTutorialStore } from '@/stores/tutorial'
import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import tocData from '../../../public/toc.json'
import { SkeletonDocs } from '../skeleton-docs.tsx'
import { CodeCompare } from './code-compare.tsx'
import { renderMD } from './md-render'
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

  const rootsRef = useRef<Map<string, any>>(new Map())

  useEffect(() => {
    const items = convertTocToMenuItems(tocData as any, lang) as any
    updateToc(items)
    const firstItem = items[0]?.items[0]
    updateCurPath(firstItem?.value || '')
  }, [lang])

  useEffect(() => {
    if (!curPath)
      return

    const findCurrentItem = () => {
      const [, group] = curPath.split('/')
      return toc.find(item => item.group === group)?.items?.find((item: any) => item.value === curPath)
    }

    const loadContent = async () => {
      const item = findCurrentItem()
      if (!item)
        return

      const [md, code] = await Promise.all([
        renderMD().then(md => md.render(item.docs || '')),
        Promise.resolve(item.code || ''),
      ])

      updateDoc(md)
      updateCode(code)

      const container = document.querySelector('.doc-container')
      if (container) {
        container.scrollTop = 0
      }
    }

    loadContent()
  }, [curPath])

  useEffect(() => {
    if (!doc)
      return

    const timer = setTimeout(() => {
      const wrappers = document.querySelectorAll('.code-compare-wrapper')

      wrappers.forEach((wrapper) => {
        const id = wrapper.getAttribute('data-id')
        const waCode = decodeURIComponent(wrapper.getAttribute('data-wa') || '')
        const goCode = decodeURIComponent(wrapper.getAttribute('data-go') || '')
        const jsCode = decodeURIComponent(wrapper.getAttribute('data-js') || '')

        if (id) {
          const root = createRoot(wrapper)
          root.render(<CodeCompare waCode={waCode} goCode={goCode} jsCode={jsCode} />)
          rootsRef.current.set(id, root)
        }
      })
    }, 0)

    return () => {
      clearTimeout(timer)
      rootsRef.current.forEach(root => root.unmount())
      rootsRef.current.clear()
    }
  }, [doc])

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
        {
          doc
            ? (
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: doc }} />
              )
            : (
                <SkeletonDocs />
              )
        }
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
