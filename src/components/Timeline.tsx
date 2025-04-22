import { PropsWithChildren } from 'react'

import { useTranslation } from 'react-i18next'

import { TimelineEntryData, TimelinePosition } from '../lib/types'
import TimelineEntry from './TimelineEntry'

export interface TimelineProps extends PropsWithChildren {
  entries: TimelineEntryData[]
  className?: string
  background?: boolean
}

const Timeline = ({ entries, className }: TimelineProps) => {
  const { t } = useTranslation()

  return (
    <div className={className}>
      <ul
        aria-label={t('timeline:application-steps-list-title')}
        className="flex flex-col"
      >
        {entries.map((entry, index) => {
          let position: TimelinePosition = 'last'
          if (index === 0) {
            position = 'first'
          } else if (index < entries.length - 1) {
            position = 'middle'
          }

          return (
            <TimelineEntry
              key={entry.step}
              position={position}
              type={entry.status}
              step={entry.step}
              date={entry.date}
              subtext={entry.subtext}
              stepIndex={index + 1} // index is zero based
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Timeline
