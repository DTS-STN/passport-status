import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { AlertPage, AlertPosition } from '../lib/types'
import { useAlerts } from '../lib/useAlert'
import AlertSection from './AlertSection'
import MarkdownContent from './MarkdownContent'

export interface AlertBlockProps {
  page: AlertPage
  position: AlertPosition
  className?: string
}

const AlertBlock: FC<AlertBlockProps> = ({ page, position, className }) => {
  const { data } = useAlerts({ page })
  const { i18n } = useTranslation()

  return (
    <div className={className}>
      {data?.alerts
        .filter((alert) => alert.position === position)
        .map((alert) => {
          return (
            <AlertSection
              key={alert.uid}
              type={alert.type}
              className="mt-4 mb-4"
            >
              <MarkdownContent
                markdown={i18n.language === 'fr' ? alert.textFr : alert.textEn}
              />
            </AlertSection>
          )
        })}
    </div>
  )
}

export default AlertBlock
