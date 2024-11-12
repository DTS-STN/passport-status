import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import AlertBlock from '../components/AlertBlock'
import Collapse from '../components/Collapse'
import ExampleImage from '../components/ExampleImage'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Landing = () => {
  const { t } = useTranslation('landing')

  return (
    <Layout>
      <NextSeo
        title={t('header')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <h1 className="h1">{t('header')}</h1>
      <AlertBlock page="landing" />
      <div className="max-w-prose">
        <p>
          <strong>{t('do-you-have.question')}</strong>
        </p>
        <div className="mb-4 flex flex-wrap gap-6 md:flex-nowrap">
          <div className="w-full">
            <LinkButton href="/status" fullWidth style="primary" id="with-esrf">
              {t('do-you-have.with-reference')}
            </LinkButton>
          </div>
          <div className="mb-8 w-full">
            <LinkButton href="/email" fullWidth id="without-esrf">
              {t('do-you-have.without-reference')}
            </LinkButton>
          </div>
        </div>
        <h2 className="h2 mb-6">{t('where-to-find.header')}</h2>
        <h3 className="h3 mb-2">{t('where-to-find.applied-by-mail.header')}</h3>
        <p>
          <Trans
            i18nKey="where-to-find.applied-by-mail.text"
            ns="landing"
            components={{ Link: <Link href="/email" /> }}
          />
        </p>
        <h3 className="h3 mb-2 mt-8">
          {t('where-to-find.applied-in-person.header')}
        </h3>
        <p>{t('where-to-find.applied-in-person.text')}</p>
        <Collapse title={t('receipt-image-1.title')}>
          <div className="mt-3 max-w-prose border-t p-3">
            <ExampleImage
              imageProps={{
                src: t('receipt-image-1.src'),
                alt: t('receipt-image-1.alt'),
                width: 500,
                height: 785,
              }}
            >
              <Trans i18nKey="receipt-image-1.descriptive-text" ns="landing" />
            </ExampleImage>
            <p>{t('receipt-1-will-find.text')}</p>
            <ul className="mb-5 list-disc pl-10">
              <li>{t('receipt-1-will-find.list.item-1')}</li>
              <li>{t('receipt-1-will-find.list.item-2')}</li>
              <li>{t('receipt-1-will-find.list.item-3')}</li>
              <li>{t('receipt-1-will-find.list.item-4')}</li>
              <li>{t('receipt-1-will-find.list.item-5')}</li>
              <li>{t('receipt-1-will-find.list.item-6')}</li>
              <li>{t('receipt-1-will-find.list.item-7')}</li>
              <li>{t('receipt-1-will-find.list.item-8')}</li>
              <li>{t('receipt-1-will-find.list.item-9')}</li>
              <li>{t('receipt-1-will-find.list.item-10')}</li>
              <li>{t('receipt-1-will-find.list.item-11')}</li>
            </ul>
          </div>
        </Collapse>
        <Collapse title={t('receipt-image-2.title')}>
          <div className="mt-3 max-w-prose border-t p-3">
            <ExampleImage
              imageProps={{
                src: t('receipt-image-2.src'),
                alt: t('receipt-image-2.alt'),
                width: 500,
                height: 785,
              }}
            >
              <Trans i18nKey="receipt-image-2.descriptive-text" ns="landing" />
            </ExampleImage>
            <p>{t('receipt-2-will-find.text')}</p>
            <ul className="mb-5 list-disc pl-10">
              <li>{t('receipt-2-will-find.list.item-1')}</li>
              <li>{t('receipt-2-will-find.list.item-2')}</li>
              <li>{t('receipt-2-will-find.list.item-3')}</li>
              <li>{t('receipt-2-will-find.list.item-4')}</li>
              <li>{t('receipt-2-will-find.list.item-5')}</li>
              <li>{t('receipt-2-will-find.list.item-6')}</li>
              <li>{t('receipt-2-will-find.list.item-7')}</li>
              <li>{t('receipt-2-will-find.list.item-8')}</li>
              <li>{t('receipt-2-will-find.list.item-9')}</li>
              <li>{t('receipt-2-will-find.list.item-10')}</li>
              <li>{t('receipt-2-will-find.list.item-11')}</li>
              <li>{t('receipt-2-will-find.list.item-12')}</li>
            </ul>
            <p>{t('receipt-2-pickup-instructions.text')}</p>
            <ul className="mb-5 list-disc pl-10">
              <li>{t('receipt-2-pickup-instructions.list.item-1')}</li>
              <li>
                {t('receipt-2-pickup-instructions.list.item-2.text')}
                <ul className="list-disc pl-10">
                  <li>
                    <Trans
                      i18nKey="receipt-2-pickup-instructions.list.item-2.list.item-1"
                      ns="landing"
                    />
                  </li>
                  <li>
                    {t('receipt-2-pickup-instructions.list.item-2.list.item-2')}
                  </li>
                </ul>
              </li>
              <li>{t('receipt-2-pickup-instructions.list.item-3')}</li>
              <li>{t('receipt-2-pickup-instructions.list.item-4')}</li>
            </ul>
          </div>
        </Collapse>
        <Collapse title={t('receipt-image-3.title')}>
          <div className="mt-3 max-w-prose border-t p-3">
            <ExampleImage
              imageProps={{
                src: t('receipt-image-3.src'),
                alt: t('receipt-image-3.alt'),
                width: 500,
                height: 785,
              }}
            >
              <Trans i18nKey="receipt-image-3.descriptive-text" ns="landing" />
            </ExampleImage>
            <p>{t('receipt-3-will-find.text')}</p>
            <ul className="mb-5 list-disc pl-10">
              <li>{t('receipt-3-will-find.list.item-1')}</li>
              <li>{t('receipt-3-will-find.list.item-2')}</li>
              <li>{t('receipt-3-will-find.list.item-3')}</li>
              <li>{t('receipt-3-will-find.list.item-4')}</li>
              <li>{t('receipt-3-will-find.list.item-5')}</li>
              <li>{t('receipt-3-will-find.list.item-6')}</li>
              <li>{t('receipt-3-will-find.list.item-7')}</li>
              <li>{t('receipt-3-will-find.list.item-8')}</li>
              <li>{t('receipt-3-will-find.list.item-9')}</li>
              <li>{t('receipt-3-will-find.list.item-10')}</li>
              <li>{t('receipt-3-will-find.list.item-11')}</li>
              <li>{t('receipt-3-will-find.list.item-12')}</li>
              <li>{t('receipt-3-will-find.list.item-13')}</li>
              <li>{t('receipt-3-will-find.list.item-14')}</li>
              <li>{t('receipt-3-will-find.list.item-15')}</li>
            </ul>
            <p>{t('receipt-3-next-steps.text')}</p>
            <ul className="mb-5 list-disc pl-10">
              <li>{t('receipt-3-next-steps.list.item-1')}</li>
              <li>{t('receipt-3-next-steps.list.item-2')}</li>
              <li>{t('receipt-3-next-steps.list.item-3')}</li>
              <li>{t('receipt-3-next-steps.list.item-4')}</li>
            </ul>
          </div>
        </Collapse>
        <h3 className="h3 mb-2 mt-8">{t('if-lost.header')}</h3>
        <p>
          <Trans
            i18nKey="if-lost.text"
            ns="landing"
            components={{ Link: <Link href="/email" /> }}
          />
        </p>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await pageWithServerSideTranslations(locale, 'landing')),
  },
})

export default Landing
