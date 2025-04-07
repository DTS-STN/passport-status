import { PropsWithChildren } from 'react'

import { useTranslation } from 'react-i18next'

import { formatDateLong } from '../lib/utils/dates'

export interface TimelineEntryContentProps extends PropsWithChildren {
  type: string
  position: string
  topText: string
  bottomText?: string
  bottomDate?: string
  className?: string
}

const TimelineEntryContent = ({
  position,
  type,
  topText,
  bottomText,
  bottomDate,
  className,
}: TimelineEntryContentProps) => {
  const { i18n } = useTranslation()
  const isCurrent = type === 'current'
  const hasDate = bottomDate !== null
  const isDoneWithBottom = type === 'done' && (hasDate || bottomText !== null)
  const isLast = position === 'last'

  return (
    <div className={`flex flex-col gap-2`}>
      {isCurrent || (isDoneWithBottom && isLast) ? (
        <span>
          <strong>{topText}</strong>
        </span>
      ) : (
        <span>{topText}</span>
      )}
      {type === 'done' && hasDate
        ? bottomDate && (
            <time dateTime={bottomDate}>
              {formatDateLong(bottomDate, i18n.language)}
            </time>
          )
        : bottomText && <span>{bottomText}</span>}
    </div>
  )
}

export default TimelineEntryContent
