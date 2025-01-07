import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'

import Layout from '../components/Layout'
import Timeline from '../components/Timeline'
import { TimelineEntryData } from '../lib/types'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'

const TimelineTest = () => {
  const { t } = useTranslation('landing')

  const entries: TimelineEntryData[] = [
    { step: 'Received', status: 'done', date: '2024-02-12' },
    {
      step: 'Processing',
      status: 'done',
      date: '2024-02-14',
    },
    {
      step: 'Printing',
      status: 'current',
      date: '2024-02-16',
    },
    { step: 'Shipped', status: 'future', date: '2024-02-18' },
    { step: 'Received', status: 'future', date: '2024-02-20' },
  ]

  return (
    <Layout>
      <h1 id="main-header" className="h1" tabIndex={-1}>
        {t('do-you-have.question')}
      </h1>
      <Timeline entries={entries} className="max-w-pros" />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await pageWithServerSideTranslations(locale, 'landing')),
  },
})

export default TimelineTest
