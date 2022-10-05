import LinkButton from '../components/LinkButton'
import { FC } from 'react'
import Layout from '../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

const Home: FC = () => {
  const { t } = useTranslation('landing')

  return (
    <Layout>
      <h1 className="mb-4">{t('header')}</h1>
      <h2 className="my-14">{t('description')}</h2>
      <div className="flex justify-center flex-wrap text-xl gap-4">
        <div id="withoutESRF">
          <LinkButton
            href={t('intakeForm')}
            text={t('withoutESRF')}
          ></LinkButton>
        </div>
        <div id="withESRF">
          <LinkButton href={'/status'} text={t('withESRF')}></LinkButton>
        </div>
      </div>
    </Layout>
  )
}

export default Home
