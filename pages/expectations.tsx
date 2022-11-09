import { FC, MouseEventHandler, useCallback } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import { setCookie } from 'cookies-next'

const Expectations: FC = () => {
  const { t } = useTranslation('expectations')

  const handleOnAgreeClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setCookie('agreed-to-email-esrf-terms', 'true', { sameSite: true })
      Router.push('/landing')
    },
    []
  )

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h2>{t('header-purpose')}</h2>
      <div className="my-5">
        <p>{t('for-applications.p1')}</p>
        <p>{t('for-applications.p2')}</p>
        <p>{t('for-applications.p3')}</p>
      </div>
      <div>
        <p>{t('recommend-10-days')}</p>
      </div>
      <div className="my-5 font-bold">
        <p>{t('do-not-travel')}</p>
      </div>
      <div className="text-red-600">
        <p>{t('unsupported-tools')}</p>
      </div>
      <h2 className="my-8">{t('header-privacy')}</h2>
      <p>{t('description-privacy')}</p>
      <div id="confirmBtn">
        <ActionButton
          style="primary"
          text={t('button-agree')}
          onClick={handleOnAgreeClick}
        />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'expectations',
    ])),
  },
})

export default Expectations
