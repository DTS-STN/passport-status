import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import Collapse from '../components/Collapse'
import ExampleImage from '../components/ExampleImage'
import LinkText from '../components/LinkText'

const Landing: FC = () => {
  const { t } = useTranslation('landing')

  return (
    <Layout>
      <NextSeo title={t('header')} />
      <h1 className="h1">{t('header')}</h1>
      <p>{t('description')}</p>
      <div className="mb-4 flex flex-wrap gap-4 md:flex-nowrap">
        <div className="w-full lg:w-4/12 xl:w-3/12">
          <LinkButton
            href="/status"
            text={t('with-esrf')}
            fullWidth
            style="primary"
            id="with-esrf"
          />
        </div>
        <div className="w-full lg:w-4/12 xl:w-3/12">
          <LinkButton
            href="/email"
            text={t('without-esrf')}
            fullWidth
            id="without-esrf"
          />
        </div>
      </div>
      <Collapse title={t('collapse-file-number-title')}>
        <div className="mt-3 max-w-prose border-t p-3">
          <p>
            <Trans
              i18nKey="receipt-explanation"
              ns="landing"
              components={{ Link: <LinkText href="/email" /> }}
            />
          </p>
          <ExampleImage
            title={t('receipt-image-1.title')}
            description={t('receipt-image-1.descriptive-text')}
            imageProps={{
              src: t('receipt-image-1.src'),
              alt: t('receipt-image-1.alt'),
              width: 350,
              height: 550,
            }}
          />
          <ExampleImage
            title={t('receipt-image-2.title')}
            description={t('receipt-image-2.descriptive-text')}
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
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'landing',
    ])),
  },
})

export default Landing
