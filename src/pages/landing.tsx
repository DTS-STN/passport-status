import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import Collapse from '../components/Collapse'
import ExampleImage from '../components/ExampleImage'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Landing: FC = () => {
  const { t, i18n } = useTranslation('landing')
  const en = i18n.getFixedT('en', 'landing')
  const fr = i18n.getFixedT('fr', 'landing')

  return (
    <Layout>
      <NextSeo
        title={t('header')}
        additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]}
      />
      <h1 className="h1">{t('header')}</h1>
      <p>{t('description')}</p>
      <div className="mb-4 flex flex-wrap gap-4 md:flex-nowrap">
        <div className="w-full lg:w-4/12 xl:w-3/12">
          <LinkButton href="/status" fullWidth style="primary" id="with-esrf">
            {t('with-esrf')}
          </LinkButton>
        </div>
        <div className="w-full lg:w-4/12 xl:w-3/12 mb-8">
          <LinkButton href="/email" fullWidth id="without-esrf">
            {t('without-esrf')}
          </LinkButton>
        </div>
      </div>
      <h2 className="h3">{t('collapse-file-number-title')}</h2>
      <p>
        <Trans
          i18nKey="receipt-explanation"
          ns="landing"
          components={{ Link: <Link href="/email" /> }}
        />
      </p>
      <Collapse title={t('receipt-image-1.title')}>
        <div className="mt-3 max-w-prose border-t p-3">
          <ExampleImage
            descriptionKey="receipt-image-1.descriptive-text"
            descriptionNamespace="landing"
            imageProps={{
              src: t('receipt-image-1.src'),
              alt: t('receipt-image-1.alt'),
              width: 350,
              height: 550,
            }}
          />
        </div>
      </Collapse>
      <Collapse title={t('receipt-image-2.title')}>
        <div className="mt-3 max-w-prose border-t p-3">
          <ExampleImage
            descriptionKey="receipt-image-2.descriptive-text"
            descriptionNamespace="landing"
            imageProps={{
              src: t('receipt-image-2.src'),
              alt: t('receipt-image-2.alt'),
              width: 350,
              height: 550,
            }}
          />
        </div>
      </Collapse>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? 'default',
      ['common', 'landing'],
      null,
      ['en', 'fr']
    )),
  },
})

export default Landing
