import { useTranslation } from 'next-i18next'

import { AlertPage } from '../lib/types'
import { useAlerts } from '../lib/useAlerts'
import AlertSection from './AlertSection'
import MarkdownContent from './MarkdownContent'

export interface AlertBlockProps {
  page?: AlertPage
  className?: string
}

const AlertBlock = ({ page, className }: AlertBlockProps) => {
  const { data } = useAlerts({ page })
  const { i18n } = useTranslation()

  return (
    <div className={className}>
      {data?.map((alert) => {
        return (
          <AlertSection key={alert.uid} type={alert.type} className="mb-4 mt-4">
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
