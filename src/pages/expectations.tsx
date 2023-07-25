import { MouseEventHandler, useCallback } from 'react'

import { setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

import ActionButton from '../components/ActionButton'
import AlertBlock from '../components/AlertBlock'
import AlertSection from '../components/AlertSection'
import ExternalLink from '../components/ExternalLink'
import Layout from '../components/Layout'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Expectations = () => {
  const { t } = useTranslation('expectations')

  const handleOnAgreeClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setCookie('agreed-to-email-esrf-terms', 'true', { sameSite: true })
      Router.push('/landing')
    },
    [],
  )

  return (
    <>
      <NextSeo
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <Layout>
        <h1 className="h1">{t('header')}</h1>
        <AlertBlock page="expectations" />
        <h2 className="h2">{t('header-avoid-waiting')}</h2>
        <p>{t('available-after.description')}</p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>{t('available-after.list.item-1')}</li>
          <li>{t('available-after.list.item-2')}</li>
        </ul>
        <p>
          <strong>{t('available-after.updated-status')}</strong>
        </p>
        <h2 className="h2">{t('header-who-can-check')}</h2>
        <p>
          <Trans i18nKey={'can-check.description'} ns="expectations" />
        </p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>{t('can-check.list.item-1')}</li>
          <li>{t('can-check.list.item-2')}</li>
        </ul>
        <p>
          <Trans i18nKey={'cannot-check.description'} ns="expectations" />
        </p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>
            <Trans i18nKey={'cannot-check.list.item-1'} ns="expectations" />
          </li>
          <li>{t('cannot-check.list.item-2')}</li>
        </ul>
        <AlertSection type="warning">
          <p className="mb-4">
            <strong>{t('do-not-travel')}</strong>
          </p>
          <p>{t('not-liable')}</p>
        </AlertSection>
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
    ...(await pageWithServerSideTranslations(
      locale ?? 'default',
      'expectations',
    )),
  },
})

export default Expectations
