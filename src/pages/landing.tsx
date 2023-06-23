import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import Collapse from '../components/Collapse'
import ExampleImage from '../components/ExampleImage'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Landing: FC = () => {
  const { t } = useTranslation('landing')

  return (
    <Layout>
      <NextSeo
        title={t('header')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <h1 className="h1">{t('header')}</h1>
      <p>{t('description')}</p>
      <div className="mb-4 flex flex-wrap gap-4 md:flex-nowrap">
        <div className="w-full lg:w-4/12 xl:w-3/12">
          <LinkButton href="/status" fullWidth style="primary" id="with-esrf">
            {t('with-esrf')}
          </LinkButton>
        </div>
        <div className="w-full lg:w-4/12 xl:w-3/12 mb-8">
          <LinkButton href="/email" fullWidth id="without-esrf">
            {t('without-esrf')}
          </LinkButton>
        </div>
      </div>
      <h2 className="h3">{t('collapse-file-number-title')}</h2>
      <p>
        <Trans
          i18nKey="receipt-explanation"
          ns="landing"
          components={{ Link: <Link href="/email" /> }}
        />
      </p>
      <Collapse title={t('receipt-image-1.title')}>
        <div className="mt-3 max-w-prose border-t p-3">
          <ExampleImage
            imageProps={{
              src: t('receipt-image-1.src'),
              alt: t('receipt-image-1.alt'),
              width: 350,
              height: 550,
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
              width: 350,
              height: 550,
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
          <p>{t('receipt-pickup-instructions.text')}</p>
          <ul className="mb-5 list-disc pl-10">
            <li>{t('receipt-pickup-instructions.list.item-1')}</li>
            <li>
              {t('receipt-pickup-instructions.list.item-2.text')}
              <ul className="list-disc pl-10">
                <li>
                  <Trans
                    i18nKey="receipt-pickup-instructions.list.item-2.list.item-1"
                    ns="landing"
                  />
                </li>
                <li>
                  {t('receipt-pickup-instructions.list.item-2.list.item-2')}
                </li>
              </ul>
            </li>
            <li>{t('receipt-pickup-instructions.list.item-3')}</li>
            <li>{t('receipt-pickup-instructions.list.item-4')}</li>
          </ul>
        </div>
      </Collapse>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await pageWithServerSideTranslations(locale, 'landing')),
  },
})

export default Landing
