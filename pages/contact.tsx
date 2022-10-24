import { FC, useState } from 'react'
import { GetStaticProps } from 'next'
import router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'
import Modal from '../components/Modal'

const Contact: FC = () => {
  const { t } = useTranslation('contact')
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="mb-4">{t('header')}</h1>
      <h2 className="my-14">{t('description')}</h2>
      <div id="contact-links" className="text-2xl">
        <LinkSummary
          links={t<string, LinkSummaryItem[]>('common:program-links', {
            returnObjects: true,
          })}
        />
      </div>
      <div className="py-2">
        <Modal
          buttonText={t('back-to-home')}
          description={t('common:cancel-modal.description')}
          isOpen={modalOpen}
          onClick={() => setModalOpen(!modalOpen)}
          buttons={[
            {
              text: t('common:cancel-modal.yes-button'),
              onClick: () => router.push('/landing'),
              style: 'primary',
            },
            {
              text: t('common:cancel-modal.no-button'),
              onClick: () => setModalOpen(!modalOpen),
            },
          ]}
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
