import ActionButton from '../components/ActionButton'
import { FC } from 'react'
import Layout from '../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'

const Home: FC = () => {
  const { t } = useTranslation('home')

  return (
    <Layout>
      <h1 className="mb-4">{t('header')}</h1>
      <h2 className="my-14">{t('description')}</h2>
      <div className="grid grid-flow-row auto-rows-auto place-items-center text-xl gap-4">
        <div className="text-center lg:w-1/3">
          <ActionButton
            href={t('intakeForm')}
            style="primary"
            text={t('withoutESRF')}
          />
        </div>
        <div className="text-center lg:w-1/3">
          <ActionButton
            style="primary"
            onClick={() => Router.push('/status')}
            text={t('withESRF')}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Home
