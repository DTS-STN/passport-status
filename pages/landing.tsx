import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import Collapse from '../components/Collapse'
import ExampleImage from '../components/ExampleImage'
import { NextSeo } from 'next-seo'

const Landing: FC = () => {
  const { t } = useTranslation('landing')

  return (
    <Layout>
      <NextSeo
        title="Landing page | Page d'accueil"
        titleTemplate={'%s \u2010 Canada.ca'}
      />
      <h1 className="h1">{t('header')}</h1>
      <p>{t('description')}</p>
      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
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
      <Collapse title={t('common:collapse-file-number-title')}>
        <div className="border-t mt-3 p-3 max-w-prose">
          <p>{t('common:receipt-explanation')}</p>
          <ExampleImage
            title={t('common:receipt-image-1.title')}
            description={t('common:receipt-image-1.descriptive-text')}
            imageProps={{
              src: t('common:receipt-image-1.src'),
              alt: t('common:receipt-image-1.alt'),
              width: 350,
              height: 550,
            }}
          />
          <ExampleImage
            title={t('common:receipt-image-2.title')}
            description={t('common:receipt-image-2.descriptive-text')}
            imageProps={{
              src: t('common:receipt-image-2.src'),
              alt: t('common:receipt-image-2.alt'),
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
