import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { AlertPage } from '../lib/types'
import { useAlerts } from '../lib/useAlerts'
import AlertSection from './AlertSection'
import MarkdownContent from './MarkdownContent'

export interface AlertBlockProps {
  page?: AlertPage
  className?: string
}

const AlertBlock: FC<AlertBlockProps> = ({ page, className }) => {
  const { data } = useAlerts({ page })
  const { i18n } = useTranslation()

  return (
    <div className={className}>
      {data?.map((alert) => {
        return (
          <AlertSection key={alert.uid} type={alert.type} className="mt-4 mb-4">
            <MarkdownContent
              markdown={i18n.language === 'fr' ? alert.textFr : alert.textEn}
              header={page === undefined}
            />
          </AlertSection>
        )
      })}
    </div>
  )
}

export default AlertBlock
