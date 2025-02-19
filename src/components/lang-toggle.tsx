import { useTutorialStore } from "@/stores/tutorial"
import { Button } from "./ui/button"

export const LangToggle = () => {
  const { lang, actions: { updateLang } } = useTutorialStore()

  return <Button
    variant="ghost"
    size="sm"
    className="mr-2"
    onClick={() => updateLang(lang === 'en' ? 'zh' : 'en')}
  >
    {lang === 'en' ? 'ZH' : 'EN'}
  </Button>
}
