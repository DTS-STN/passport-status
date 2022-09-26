import { useRouter } from 'next/router'
import en from './en'
import fr from './fr'

export type HomeLocale = typeof en | typeof fr

const useHomeLocale = (): HomeLocale => {
  const { locale } = useRouter()
  return locale === 'fr' ? fr : en
}

export default useHomeLocale
