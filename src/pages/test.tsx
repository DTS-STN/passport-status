import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'

import Layout from '../components/Layout'
import Timeline from '../components/Timeline'
import { TimelineEntryData } from '../lib/types'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'

const Landing = () => {
  const { t } = useTranslation('landing')

  const entries: TimelineEntryData[] = [
    {
      step: 'Received',
      date: '2024-12-01',
      status: 'done',
    },
    {
      step: 'Filed',
      date: '2024-12-02',
      status: 'done',
    },
    {
      step: 'Processing',
      date: '2024-12-03',
      status: 'current',
    },
    {
      step: 'Approved',
      date: '2024-12-04',
      status: 'future',
    },
    {
      step: 'Shipped',
      date: '2024-12-05',
      status: 'future',
    },
  ]
  return (
    <Layout>
      <Timeline entries={entries} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await pageWithServerSideTranslations(locale, 'landing')),
  },
})

export default Landing
