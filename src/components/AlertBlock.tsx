import { useTranslation } from 'next-i18next'

import { AlertPage } from '../lib/types'
import { useAlerts } from '../lib/useAlerts'
import AlertSection from './AlertSection'
import { MarkdownContent } from './MarkdownContent'

export interface AlertBlockProps {
  page?: AlertPage
  className?: string
}

const AlertBlock = ({ page, className }: AlertBlockProps) => {
  const { data } = useAlerts({ page })
  const { i18n } = useTranslation()

  return (
    <div className={className}>
      {data?.map(({ textEn, textFr, type, uid }) => {
        const markdown = i18n.language === 'fr' ? textFr : textEn
        return (
          <AlertSection key={uid} type={type} className="mb-4 mt-4">
            <MarkdownContent markdown={markdown} />
          </AlertSection>
        )
      })}
    </div>
  )
}

export default AlertBlock
