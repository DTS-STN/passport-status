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
  stepIndex: number
}

const TimelineEntryContent = ({
  position,
  type,
  topText,
  bottomText,
  bottomDate,
  className,
  stepIndex,
}: TimelineEntryContentProps) => {
  const { i18n, t } = useTranslation()
  const isCurrent = type === 'current'
  const hasDate = bottomDate && bottomDate !== null
  const isDoneWithBottom = type === 'done' && (hasDate || bottomText !== null)
  const isLast = position === 'last'

  const stepAriaLabel = (() => {
    const bottomLine =
      type === 'done' && hasDate
        ? formatDateLong(bottomDate, i18n.language)
        : bottomText

    return t('timeline:step-aria-label', {
      index: stepIndex,
      type: t(`timeline:type-${type}`),
      step: `${topText}${bottomLine ? `, ${bottomLine}` : ''}`,
    })
  })()

  return (
    <>
      <span className="sr-only">{stepAriaLabel}</span>
      <div aria-hidden="true" className={`flex flex-col gap-2`}>
        {isCurrent || (isDoneWithBottom && isLast) ? (
          <span>
            <strong>{topText}</strong>
          </span>
        ) : (
          <span>{topText}</span>
        )}
        {type === 'done' && hasDate ? (
          <time dateTime={bottomDate}>
            {formatDateLong(bottomDate, i18n.language)}
          </time>
        ) : (
          bottomText && <span>{bottomText}</span>
        )}
      </div>
    </>
  )
}

export default TimelineEntryContent
