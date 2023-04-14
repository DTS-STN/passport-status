import { FC, MouseEventHandler, useCallback } from 'react'

import { setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

import ActionButton from '../components/ActionButton'
import ExternalLink from '../components/ExternalLink'
import Layout from '../components/Layout'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Expectations: FC = () => {
  const { t, i18n } = useTranslation('expectations')
  const en = i18n.getFixedT('en', 'expectations')
  const fr = i18n.getFixedT('fr', 'expectations')

  const handleOnAgreeClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setCookie('agreed-to-email-esrf-terms', 'true', { sameSite: true })
      Router.push('/landing')
    },
    []
  )

  return (
    <>
      <NextSeo
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]}
      />
      <Layout>
        <h1 className="h1">{t('header')}</h1>
        <h2 className="h2">{t('header-avoid-waiting')}</h2>
        <p>{t('available-after.description')}</p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>{t('available-after.list.item-1')}</li>
          <li>{t('available-after.list.item-2')}</li>
        </ul>
        <p>
          <strong>{t('available-after.updated-status')}</strong>
        </p>
        <h2 className="h2">{t('header-who-can-check')}</h2>
        <p>
          <Trans i18nKey={'can-check.description'} ns="expectations" />
        </p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>{t('can-check.list.item-1')}</li>
          <li>{t('can-check.list.item-2')}</li>
        </ul>
        <p>
          <Trans i18nKey={'cannot-check.description'} ns="expectations" />
        </p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>
            <Trans i18nKey={'cannot-check.list.item-1'} ns="expectations" />
          </li>
          <li>{t('cannot-check.list.item-2')}</li>
        </ul>
        <div>
          <div className="bg-white -ml-4 -mb-6">
            <svg
              className="fill-orange-500 w-10 h-10 w-10"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5.511c.561 0 1.119.354 1.544 1.062l5.912 9.854c.851 1.415.194 2.573-1.456 2.573h-12c-1.65 0-2.307-1.159-1.456-2.573l5.912-9.854c.425-.708.983-1.062 1.544-1.062m0-2c-1.296 0-2.482.74-3.259 2.031l-5.912 9.856c-.786 1.309-.872 2.705-.235 3.83s1.879 1.772 3.406 1.772h12c1.527 0 2.77-.646 3.406-1.771s.551-2.521-.235-3.83l-5.912-9.854c-.777-1.294-1.963-2.034-3.259-2.034z" />
              <circle cx="12" cy="16" r="1.3" />
              <path d="M13.5 10c0-.83-.671-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .199.041.389.111.562.554 1.376 1.389 3.438 1.389 3.438l1.391-3.438c.068-.173.109-.363.109-.562z" />
            </svg>
          </div>
          <section className="border-l-8 border-orange-500">
            <p className="m-4">
              <strong>{t('do-not-travel')}</strong>
            </p>
            <p className="m-4">{t('not-liable')}</p>
          </section>
        </div>
        <h2 className="h2">{t('header-privacy')}</h2>
        <p>
          <Trans i18nKey={'description-privacy.1'} ns="expectations" />
        </p>
        <p>{t('description-privacy.2')}</p>
        <p>{t('description-privacy.3')}</p>
        <p>
          <Trans
            i18nKey={'description-privacy.4'}
            ns="expectations"
            components={{
              Link: <ExternalLink href={t('description-privacy.4-link')} />,
            }}
          />
        </p>
        <p>
          <Trans
            i18nKey={'description-privacy.5'}
            ns="expectations"
            components={{
              Link: <ExternalLink href={t('description-privacy.5-link')} />,
            }}
          />
        </p>
        <p>
          <Trans
            i18nKey={'description-privacy.6'}
            ns="expectations"
            components={{
              Link: <ExternalLink href={t('description-privacy.6-link')} />,
            }}
          />
        </p>
        <div className="mt-8">
          <ActionButton
            id="btn-agree"
            style="primary"
            text={t('button-agree')}
            onClick={handleOnAgreeClick}
          />
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? 'default',
      ['common', 'expectations'],
      null,
      ['en', 'fr']
    )),
  },
})

export default Expectations
