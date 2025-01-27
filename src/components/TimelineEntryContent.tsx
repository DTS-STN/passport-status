import { PropsWithChildren } from 'react'

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
  const isCurrent = type === 'current'
  const hasDate = bottomDate !== null
  const isDoneWithBottom = type === 'done' && (hasDate || bottomText !== null)
  const isLast = position === 'last'

  return (
    <div className={className}>
      {isCurrent || (isDoneWithBottom && isLast) ? (
        <p>
          <strong>{topText}</strong>
        </p>
      ) : (
        <p>{topText}</p>
      )}
      {type === 'done' && hasDate ? (
        <time dateTime={bottomDate}>{bottomDate}</time>
      ) : (
        <p>{bottomText}</p>
      )}
    </div>
  )
}

export default TimelineEntryContent
