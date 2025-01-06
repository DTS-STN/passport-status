import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'

import Layout from '../components/Layout'
import Timeline from '../components/Timeline'
import { TimelineEntryProps } from '../components/TimelineEntry'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'

const Test = () => {
  const { t } = useTranslation('landing')

  const entries: TimelineEntryProps[] = [
    { type: 'done', position: 'first', step: 'Received', date: '2024-02-12' },
    {
      type: 'done',
      position: 'middle',
      step: 'Processing',
      date: '2024-02-14',
    },
    {
      type: 'current',
      position: 'middle',
      step: 'Printing',
      date: '2024-02-16',
    },
    { type: 'future', position: 'middle', step: 'Shipped', date: '2024-02-18' },
    { type: 'future', position: 'last', step: 'Received', date: '2024-02-20' },
  ]

  return (
    <Layout>
      <h1 id="main-header" className="h1" tabIndex={-1}>
        {t('do-you-have.question')}
      </h1>
      <div className="max-w-prose">
        <Timeline entries={entries} />
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
