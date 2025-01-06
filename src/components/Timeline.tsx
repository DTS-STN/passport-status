import { PropsWithChildren } from 'react'

import TimelineEntry, { TimelineEntryProps } from './TimelineEntry'

export interface TimelineProps extends PropsWithChildren {
  entries: TimelineEntryProps[]
  className?: string
  background?: boolean
}

const Timeline = ({ entries, className, background }: TimelineProps) => {
  return (
    <div className="flex flex-col">
      <div className="m-0">
        {entries.map((entry) => {
          return <TimelineEntry key={entry.step} {...entry} />
        })}
      </div>
    </div>
  )
}

export default Timeline
