import { PropsWithChildren } from 'react'

import { TimelineEntryData, TimelinePosition } from '../lib/types'
import TimelineEntry from './TimelineEntry'

export interface TimelineProps extends PropsWithChildren {
  entries: TimelineEntryData[]
  className?: string
  background?: boolean
}

const Timeline = ({ entries, className }: TimelineProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col">
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
            />
          )
        })}
      </div>
    </div>
  )
}

export default Timeline
