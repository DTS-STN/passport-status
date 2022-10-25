// @see: https://react.i18next.com/misc/testing

export const appWithTranslation = (wrappedComponent: any) => wrappedComponent

export const useTranslation = () => ({
  t: (str: string) => str,
  i18n: {
    changeLanguage: () => new Promise(() => {}),
  },
})
