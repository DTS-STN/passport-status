// @see: https://react.i18next.com/misc/testing
import { ComponentType } from 'react'

import { AppProps } from 'next/app'

export const appWithTranslation = <Props extends AppProps>(
  WrappedComponent: ComponentType<Props>,
) => WrappedComponent

export const Trans = ({ i18nKey }: { i18nKey: string }) => i18nKey

export const useTranslation = () => ({
  t: (str: string) => str,
  i18n: {
    changeLanguage: () => new Promise(() => {}),
    getFixedT: () => () => {},
  },
})
