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

  return data !== undefined && data !== null && data.length > 0 ? (
    <div className={`${className} pt-4`}>
      {data?.map(({ textEn, textFr, type, uid }) => {
        const markdown = i18n.language === 'fr' ? textFr : textEn
        return (
          <AlertSection key={uid} type={type} background>
            <MarkdownContent markdown={markdown} />
          </AlertSection>
        )
      })}
    </div>
  ) : (
    <div />
  )
}

export default AlertBlock
