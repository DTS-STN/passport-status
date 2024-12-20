import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'

import Layout from '../components/Layout'
import TimelineEntry from '../components/TimelineEntry'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'

const Test = () => {
  const { t } = useTranslation('landing')

  return (
    <Layout>
      <h1 id="main-header" className="h1" tabIndex={-1}>
        {t('do-you-have.question')}
      </h1>
      <div className="max-w-prose">
        <TimelineEntry
          type="done"
          position="middle"
          step="Processing"
          date="2024-02-14"
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await pageWithServerSideTranslations(locale, 'landing')),
  },
})

export default Test
