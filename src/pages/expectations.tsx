import { MouseEventHandler, useCallback } from 'react'

import { setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

import ActionButton from '../components/ActionButton'
import AlertBlock from '../components/AlertBlock'
import Collapse from '../components/Collapse'
import ExternalLink from '../components/ExternalLink'
import Layout from '../components/Layout'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Expectations = () => {
  const { t } = useTranslation(['expectations', 'common'])

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
        title={t('header')}
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <Layout>
        <AlertBlock page="expectations" />
        <h1 id="main-header" className="h1" tabIndex={-1}>
          {t('header')}
        </h1>
        <div className="max-w-prose">
          <p>
            <Trans i18nKey="thank-you" ns="expectations" />
          </p>
          <h2 className="h2 mb-4">{t('do-not-travel')}</h2>
          <p>{t('not-liable')}</p>
          <h2 className="h2">{t('header-privacy')}</h2>
          <p>{t('privacy-description')}</p>
          <Collapse
            title={t('header-privacy')}
            detailProps="rounded border"
            summaryProps="hover:underline focus:underline"
          >
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
          </Collapse>
          <div className="mt-8">
            <ActionButton
              id="btn-agree"
              style="primary"
              text={t('button-agree')}
              onClick={handleOnAgreeClick}
            />
          </div>
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
