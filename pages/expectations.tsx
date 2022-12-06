import { FC, MouseEventHandler, useCallback } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import { setCookie } from 'cookies-next'

const Expectations: FC = () => {
  const { t } = useTranslation('expectations')

  const handleOnAgreeClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setCookie('agreed-to-email-esrf-terms', 'true', { sameSite: true })
      Router.push('/landing')
    },
    []
  )

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="h1">{t('header-purpose')}</h1>
      <p>{t('can-check.description')}</p>
      <ul className="space-y-2 pl-4 mb-3">
        <IconListItem icon="check-mark" text={t('can-check.list.item-1')} />
        <IconListItem icon="check-mark" text={t('can-check.list.item-2')} />
      </ul>
      <p>{t('available-after.description')}</p>
      <ul className="space-y-2 pl-4 mb-3">
        <IconListItem
          icon="check-mark"
          text={t('available-after.list.item-1')}
        />
        <IconListItem
          icon="check-mark"
          text={t('available-after.list.item-2')}
        />
      </ul>
      <p>{t('cannot-check.description')}</p>
      <ul className="space-y-2 pl-4">
        <IconListItem icon="cross" text={t('cannot-check.list.item-1')} />
        <IconListItem icon="cross" text={t('cannot-check.list.item-2')} />
      </ul>
      <p className="my-8">
        <strong>{t('do-not-travel')}</strong>
      </p>
      <h2 className="h2">{t('header-privacy')}</h2>
      <p>{t('description-privacy')}</p>
      <div id="confirmBtn">
        <ActionButton
          style="primary"
          text={t('button-agree')}
          onClick={handleOnAgreeClick}
        />
      </div>
    </Layout>
  )
}

interface IconListItemProps {
  icon: 'check-mark' | 'cross'
  text: string
}

const IconListItem: FC<IconListItemProps> = ({ icon, text }) => {
  return (
    <li className="flex flex-nowrap gap-2">
      <div className="font-bold">
        {icon === 'check-mark' ? <>&#10003;</> : <>&#10007;</>}
      </div>
      <div>{text}</div>
    </li>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'expectations',
    ])),
  },
})

export default Expectations
