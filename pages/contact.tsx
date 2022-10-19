import { FC } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'

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
      <div className="space-y-4 text-xl">
        <div id="contactUs">
          <LinkButton
            href={t('links.contact.link')}
            text={t('links.contact.text')}
            external
          ></LinkButton>
        </div>
        <div id="findServiceLocation">
          <LinkButton
            href={t('links.findServiceLocation.link')}
            text={t('links.findServiceLocation.text')}
            external
          ></LinkButton>
        </div>
        <div id="bookAppointment">
          <LinkButton
            href={t('links.bookAppointment.link')}
            text={t('links.bookAppointment.text')}
            external
          ></LinkButton>
        </div>
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
