import { FC, useState } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import LinkButton from '../components/LinkButton'

const Privacy: FC = () => {
  const { t } = useTranslation('privacy')
  const [agree, setAgree] = useState(false)

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="mb-4">{t('header')}</h1>
      <div className="max-w-4xl overflow-hidden ml-auto mr-auto p-3">
        <span id="terms" style={{ display: !agree ? 'block' : 'none' }}>
          <p>{t('terms-text')}</p>
          <div
            id="termsBtnGrp"
            className="flex flex-wrap justify-end space-x-2"
          >
            <ActionButton
              text={t('agree')}
              style="primary"
              onClick={() => setAgree(true)}
            />
            <ActionButton
              text={t('disagree')}
              onClick={() => Router.push('/contact')}
            />
          </div>
        </span>
        <span id="privacy" style={{ display: agree ? 'block' : 'none' }}>
          <p>{t('privacy-text')}</p>
          <div
            id="privacyBtnGrp"
            className="flex flex-wrap justify-end space-x-2"
          >
            <LinkButton
              id="goToConsent"
              href="/consent"
              text={t('continue')}
            ></LinkButton>
            <ActionButton text={t('back')} onClick={() => setAgree(false)} />
          </div>
        </span>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'privacy',
    ])),
  },
})

export default Privacy
