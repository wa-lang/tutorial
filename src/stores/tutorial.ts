import { IDB } from '@/lib/idb'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createSelectors } from './withSelectors'

interface INavItem {
  label: string
  value: string
  code?: string
}

interface IStore {
  toc: any[]
  curPath: string
  doc: string
  lang: 'en' | 'zh'
  code: string
  actions: {
    updateToc: (toc: any[]) => void
    updateCurPath: (path: string) => void
    updateDoc: (doc: string) => void
    updateLang: (lang: 'en' | 'zh') => void
    updateCode: (code: string) => void
    getCurIdx: () => number
    getAllItems: () => INavItem[]
    getNavItems: () => { prev: INavItem | null, next: INavItem | null }
    updatePathByIndex: (index: number) => void
  }
}

const initialState: Omit<IStore, 'actions'> = {
  toc: [],
  curPath: '',
  doc: '',
  lang: 'zh',
  code: '',
}

const tutorialStore = create<IStore>()(
  persist<IStore>(
    (set, get) => ({
      ...initialState,
      actions: {
        updateToc: toc => set({ toc }),
        updateCurPath: curPath => set({ curPath }),
        updateDoc: doc => set({ doc }),
        updateLang: lang => set({ lang }),
        updateCode: code => set({ code }),
        getCurIdx: () => {
          const { curPath } = get()
          return get().actions.getAllItems().findIndex(item => item.value === curPath)
        },
        getAllItems: () => get().toc.flatMap(category => category.items || []),
        getNavItems: () => {
          const curIdx = get().actions.getCurIdx()
          const allItems = get().actions.getAllItems()
          return {
            prev: curIdx > 0 ? allItems[curIdx - 1] : null,
            next: curIdx < allItems.length - 1 ? allItems[curIdx + 1] : null,
          }
        },
        updatePathByIndex: (index: number) => {
          const allItems = get().actions.getAllItems()
          if (index >= 0 && index < allItems.length) {
            get().actions.updateCurPath(allItems[index].value)
          }
        },
      },
    }),
    {
      name: 'WA_TUTORIAL_STORAGE',
      version: 1,
      storage: createJSONStorage(() => IDB),
      partialize: ({ actions, ...rest }: IStore) => ({ ...rest }) as IStore,
    },
  ),
)

export const useTutorialStore = createSelectors(tutorialStore)
