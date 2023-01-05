import { FC, MouseEventHandler, useCallback } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import { setCookie } from 'cookies-next'

const Expectations: FC = () => {
  const { t } = useTranslation('expectations')

  const handleOnAgreeClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setCookie('agreed-to-email-esrf-terms', 'true', { sameSite: true })
      Router.push('/landing')
    },
    []
  )

  return (
    <Layout>
      <h1 className="h1">{t('header-purpose')}</h1>
      <h2 className="h2">{t('header-avoid-waiting')}</h2>
      <p>{t('available-after.description')}</p>
      <ul className="list-disc space-y-2 pl-10 mb-3">
        <li>
          {t('available-after.list.item-1')} <b>{t('or')}</b>
        </li>
        <li>{t('available-after.list.item-2')}</li>
      </ul>
      <b>{t('available-after.updated-status')}</b>
      <h2 className="h2">{t('header-who-can-check')}</h2>
      <p>{t('can-check.description')}</p>
      <ul className="list-disc space-y-2 pl-10 mb-3">
        <li>
          {t('can-check.list.item-1.in-person')} <b>{t('or')} </b>
          {t('can-check.list.item-1.by-mail')}
        </li>
        <li>{t('can-check.list.item-2')}</li>
      </ul>
      <p>{t('cannot-check.description')}</p>
      <ul className="list-disc space-y-2 pl-10 mb-3">
        <li>
          {t('cannot-check.list.item-1')} <b>{t('or')}</b>
        </li>
        <li>{t('cannot-check.list.item-2')}</li>
      </ul>
      <blockquote className="py-3 px-6 mb-3 border-l-6 border-gray-200">
        <p className="m-0">{t('do-not-travel')}</p>
      </blockquote>
      <h2 className="h2">{t('header-privacy')}</h2>
      <p>{t('description-privacy')}</p>
      <ActionButton
        id="btn-agree"
        style="primary"
        text={t('button-agree')}
        onClick={handleOnAgreeClick}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'expectations',
    ])),
  },
})

export default Expectations
