import { FC, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'
import Modal from '../components/Modal'
import ActionButton from '../components/ActionButton'

const Contact: FC = () => {
  const { t } = useTranslation('contact')
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="h1">{t('header')}</h1>
      <div id="contact-links" className="mb-5">
        <LinkSummary
          title={t('description')}
          links={t<string, LinkSummaryItem[]>('common:program-links', {
            returnObjects: true,
          })}
        />
      </div>
      <ActionButton
        text={t('back-to-home')}
        onClick={() => setModalOpen(true)}
      />
      <Modal
        open={modalOpen}
        actionButtons={[
          {
            text: t('common:modal.yes-button'),
            onClick: () => router.push('/landing'),
            style: 'primary',
          },
          {
            text: t('common:modal.no-button'),
            onClick: () => setModalOpen(false),
          },
        ]}
        header={t('common:modal.header')}
      >
        <p>{t('common:modal.description')}</p>
      </Modal>
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
