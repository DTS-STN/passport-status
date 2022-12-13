import { FC } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'

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
      <div className="flex flex-wrap md:flex-nowrap gap-4">
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