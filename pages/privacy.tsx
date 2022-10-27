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
      <div className="ml-auto mr-auto p-3">
        {!agree && (
          <span id="terms">
            <h2 className="my-14">{t('terms-text')}</h2>
            <div
              id="termsBtnGrp"
              className="flex flex-wrap justify-center space-x-2"
            >
              <ActionButton
                text={t('agree')}
                style="primary"
                onClick={() => setAgree(true)}
              />
              <ActionButton
                text={t('disagree')}
                style="primary"
                onClick={() => Router.push('/contact')}
              />
            </div>
          </span>
        )}

        {agree && (
          <span id="privacy">
            <h2 className="my-14">{t('privacy-text')}</h2>
            <div
              id="privacyBtnGrp"
              className="flex flex-wrap justify-center space-x-2"
            >
              <LinkButton
                id="goToConsent"
                href="/consent"
                text={t('continue')}
              />
              <ActionButton
                text={t('back')}
                onClick={() => setAgree(false)}
                style="primary"
              />
            </div>
          </span>
        )}
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
