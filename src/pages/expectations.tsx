import { FC, MouseEventHandler, useCallback } from 'react'

import { setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

import ActionButton from '../components/ActionButton'
import ExternalLink from '../components/ExternalLink'
import Layout from '../components/Layout'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Expectations: FC = () => {
  const { t, i18n } = useTranslation('expectations')
  const en = i18n.getFixedT('en', 'expectations')
  const fr = i18n.getFixedT('fr', 'expectations')

  const handleOnAgreeClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setCookie('agreed-to-email-esrf-terms', 'true', { sameSite: true })
      Router.push('/landing')
    },
    []
  )

  return (
    <>
      <NextSeo
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]}
      />
      <Layout>
        <h1 className="h1">{t('header')}</h1>
        <h2 className="h2">{t('header-avoid-waiting')}</h2>
        <p>{t('available-after.description')}</p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>
            <Trans i18nKey={'available-after.list.item-1'} ns="expectations" />
          </li>
          <li>{t('available-after.list.item-2')}</li>
        </ul>
        <p>
          <strong>{t('available-after.updated-status')}</strong>
        </p>
        <h2 className="h2">{t('header-who-can-check')}</h2>
        <p>{t('can-check.description')}</p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>
            <Trans i18nKey={'can-check.list.item-1'} ns="expectations" />
          </li>
          <li>{t('can-check.list.item-2')}</li>
        </ul>
        <p>{t('cannot-check.description')}</p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>
            <Trans i18nKey={'cannot-check.list.item-1'} ns="expectations" />
          </li>
          <li>{t('cannot-check.list.item-2')}</li>
        </ul>
        <div className="mb-5 rounded border border-gray-300 bg-gray-100 p-5">
          <p className="m-0">{t('do-not-travel')}</p>
        </div>
        <h2 className="h2">{t('header-privacy')}</h2>
        <p>
          <Trans i18nKey={'description-privacy.1'} ns="expectations" />
        </p>
        <p>{t('description-privacy.2')}</p>
        <p>{t('description-privacy.3')}</p>
        <p>
          <Trans
            i18nKey={'description-privacy.4'}
            ns="expectations"
            components={{
              Link: <ExternalLink href={t('description-privacy.4-link')} />,
            }}
          />
        </p>
        <p>
          <Trans
            i18nKey={'description-privacy.5'}
            ns="expectations"
            components={{
              Link: <ExternalLink href={t('description-privacy.5-link')} />,
            }}
          />
        </p>
        <p>
          <Trans
            i18nKey={'description-privacy.6'}
            ns="expectations"
            components={{
              Link: <ExternalLink href={t('description-privacy.6-link')} />,
            }}
          />
        </p>
        <div className="mt-8">
          <ActionButton
            id="btn-agree"
            style="primary"
            text={t('button-agree')}
            onClick={handleOnAgreeClick}
          />
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? 'default',
      ['common', 'expectations'],
      null,
      ['en', 'fr']
    )),
  },
})

export default Expectations
