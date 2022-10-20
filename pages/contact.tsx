import { FC } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'

const Contact: FC = () => {
  const { t } = useTranslation('contact')

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="mb-4">{t('header')}</h1>
      <h2 className="my-14">{t('description')}</h2>
      <div id="contactLinks" className="text-2xl">
        <LinkSummary
          links={t<string, LinkSummaryItem[]>('common:program-links', {
            returnObjects: true,
          })}
        />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'contact',
    ])),
  },
})

export default Contact
