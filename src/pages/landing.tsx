import { GetServerSideProps } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import AlertBlock from '../components/AlertBlock';
import Collapse from '../components/Collapse';
import ExampleImage from '../components/ExampleImage';
import Layout from '../components/Layout';
import LinkButton from '../components/LinkButton';
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils';
import { getDCTermsTitle } from '../lib/utils/seo-utils';

const Landing = () => {
  const { t } = useTranslation('landing');

  return (
    <Layout>
      <NextSeo title={t('do-you-have.question')} additionalMetaTags={[getDCTermsTitle(t('header'))]} />
      <AlertBlock page="landing" />
      <h1 id="main-header" className="h1" tabIndex={-1}>
        {t('do-you-have.question')}
      </h1>
      <div className="max-w-prose">
        <h2 className="h2 mb-6">{t('where-to-find.header')}</h2>
        <Collapse title={t('where-to-find.applied-by-mail.header')}>
          <p>
            <Trans i18nKey="where-to-find.applied-by-mail.text" ns="landing" components={{ Link: <Link href="/email" /> }} />
          </p>
        </Collapse>
        <Collapse title={t('where-to-find.applied-in-person.header')}>
          <p>{t('where-to-find.applied-in-person.text')}</p>
          <div className="mt-5 max-w-prose">
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
          </div>
        </Collapse>
        <Collapse title={t('if-lost.header')}>
          <p>
            <Trans i18nKey="if-lost.text" ns="landing" components={{ Link: <Link href="/email" /> }} />
          </p>
        </Collapse>

        <div className="mt-8 mb-4 flex flex-wrap gap-6 md:flex-nowrap">
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
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await pageWithServerSideTranslations(locale, 'landing')),
  },
});

export default Landing;
