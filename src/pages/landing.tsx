import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import AlertBlock from '../components/AlertBlock'
import Collapse from '../components/Collapse'
import ExampleImage from '../components/ExampleImage'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Landing = () => {
  const { t } = useTranslation('landing')

  return (
    <Layout>
      <NextSeo
        title={t('header')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <AlertBlock page="landing" />
      <h1 id="main-header" className="h1" tabIndex={-1}>
        {t('header')}
      </h1>
      <div className="max-w-prose">
        <p>
          <strong>{t('do-you-have.question')}</strong>
        </p>
        <div className="mb-4 flex flex-wrap gap-6 md:flex-nowrap">
          <div className="w-full">
            <LinkButton href="/status" fullWidth style="primary" id="with-esrf">
              {t('do-you-have.with-reference')}
            </LinkButton>
          </div>
          <div className="mb-8 w-full">
            <LinkButton href="/email" fullWidth id="without-esrf">
              {t('do-you-have.without-reference')}
            </LinkButton>
          </div>
        </div>
        <h2 className="h2 mb-6">{t('where-to-find.header')}</h2>
        <h3 className="h3 mb-2">{t('where-to-find.applied-by-mail.header')}</h3>
        <p>
          <Trans
            i18nKey="where-to-find.applied-by-mail.text"
            ns="landing"
            components={{ Link: <Link href="/email" /> }}
          />
        </p>
        <h3 className="h3 mb-2 mt-8">
          {t('where-to-find.applied-in-person.header')}
        </h3>
        <p>{t('where-to-find.applied-in-person.text')}</p>
        <Collapse title={t('receipt-image-1.title')}>
          <div className="mt-3 max-w-prose border-t p-3">
            <ExampleImage
              imageProps={{
                src: t('receipt-image-1.src'),
                alt: t('receipt-image-1.alt'),
                width: 500,
                height: 785,
              }}
            >
              <Trans i18nKey="receipt-image-1.descriptive-text" ns="landing" />
            </ExampleImage>
          </div>
        </Collapse>
        <Collapse title={t('receipt-image-2.title')}>
          <div className="mt-3 max-w-prose border-t p-3">
            <ExampleImage
              imageProps={{
                src: t('receipt-image-2.src'),
                alt: t('receipt-image-2.alt'),
                width: 500,
                height: 785,
              }}
            >
              <Trans i18nKey="receipt-image-2.descriptive-text" ns="landing" />
            </ExampleImage>
          </div>
        </Collapse>
        <Collapse title={t('receipt-image-3.title')}>
          <div className="mt-3 max-w-prose border-t p-3">
            <ExampleImage
              imageProps={{
                src: t('receipt-image-3.src'),
                alt: t('receipt-image-3.alt'),
                width: 500,
                height: 785,
              }}
            >
              <Trans i18nKey="receipt-image-3.descriptive-text" ns="landing" />
            </ExampleImage>
          </div>
        </Collapse>
        <h3 className="h3 mb-2 mt-8">{t('if-lost.header')}</h3>
        <p>
          <Trans
            i18nKey="if-lost.text"
            ns="landing"
            components={{ Link: <Link href="/email" /> }}
          />
        </p>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await pageWithServerSideTranslations(locale, 'landing')),
  },
})

export default Landing
