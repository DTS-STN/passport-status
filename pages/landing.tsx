import { FC } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import Collapse from '../components/Collapse'
import ExampleImage from '../components/ExampleImage'

const Landing: FC = () => {
  const { t } = useTranslation('landing')

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
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
      <Collapse title={t('collapse-file-number-title')}>
        <div className="border-t mt-3 p-3 max-w">
          <ExampleImage
            title={t('receipt-image-1.title')}
            description={t('receipt-image-1.description-alt')}
            imageProps={{
              src: t('receipt-image-1.src'),
              alt: t('receipt-image-1.description-alt'),
              width: 350,
              height: 550,
            }}
          />
          <ExampleImage
            title={t('receipt-image-2.title')}
            description={t('receipt-image-2.description-alt')}
            imageProps={{
              src: t('receipt-image-2.src'),
              alt: t('receipt-image-2.description-alt'),
              width: 350,
              height: 550,
            }}
          />
        </div>
      </Collapse>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'landing',
    ])),
  },
})

export default Landing
