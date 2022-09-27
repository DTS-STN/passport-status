import { useRouter } from 'next/router'
import en from './en'
import fr from './fr'

export type CommonLocale = typeof en | typeof fr

const useCommonLocale = (): CommonLocale => {
  const { locale } = useRouter()
  return locale === 'fr' ? fr : en
}

export default useCommonLocale
