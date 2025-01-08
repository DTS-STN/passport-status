import { PropsWithChildren } from 'react'

import { TimelineEntryStatus, TimelinePosition } from '../lib/types'

export interface TimelineEntryProps extends PropsWithChildren {
  type: TimelineEntryStatus
  step: string
  date?: string
  position: TimelinePosition
  className?: string
  background?: boolean
}

const topBorderStyle = (
  type: TimelineEntryStatus,
  position: TimelinePosition,
) => {
  const style =
    type === 'future' ? 'border-dashed border-black' : 'border-accent-success'

  return position === 'first' ? 'border-transparent' : style
}

const bottomBorderStyle = (
  type: TimelineEntryStatus,
  position: TimelinePosition,
) => {
  const style =
    type === 'done' ? 'border-accent-success' : 'border-dashed border-black'

  return position === 'last' ? 'border-transparent' : style
}

const svgStyles = {
  done: '-translate-x-8',
  current: '-translate-x-8',
  future: '-translate-x-8',
}

const SVG = (type: TimelineEntryStatus, background: boolean | undefined) => {
  switch (type) {
    case 'done': {
      return (
        <svg
          className={`${background ? 'bg-slate-100' : 'bg-white'} h-8 w-8 fill-accent-success`}
          viewBox="1 4 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="36"
            cy="36"
            r="24"
            fill="green"
            stroke="green"
            stroke-width="8"
          />
          <line
            x1="31"
            y1="47"
            x2="49"
            y2="27"
            stroke="white"
            stroke-width="6"
          />
          <line
            x1="34"
            y1="48"
            x2="21"
            y2="37"
            stroke="white"
            stroke-width="6"
          />
        </svg>
      )
    }
    case 'current': {
      return (
        <svg
          className={`${background ? 'bg-slate-100' : 'bg-white'} h-8 w-8`}
          viewBox="1 4 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="36"
            cy="36"
            r="24"
            fill="black"
            stroke="black"
            stroke-width="8"
          />
        </svg>
      )
    }
    case 'future': {
      return (
        <svg
          className={`${background ? 'bg-slate-100' : 'bg-white'} h-8 w-8`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="1 4 64 64"
          aria-hidden="true"
        >
          <circle
            cx="36"
            cy="36"
            r="24"
            fill="none"
            stroke="black"
            stroke-width="8"
          />
        </svg>
      )
    }
  }
}

const TimelineEntry = ({
  type,
  position,
  step,
  date,
  className,
  background,
}: TimelineEntryProps) => {
  const topBorderComputedStyle = topBorderStyle(type, position)
  const bottomBorderComputedStyle = bottomBorderStyle(type, position)

  return (
    <div className={className}>
      <div className="flex flex-row">
        <div className="relative h-auto w-8">
          <div
            className={`absolute left-1/2 top-0 h-1/2 w-4 transform border-l-4 ${topBorderComputedStyle}`}
          />
          <div
            className={`absolute left-1/2 top-1/2 h-1/2 w-4 transform border-l-4 ${bottomBorderComputedStyle}`}
          />
        </div>
        <div className={`${svgStyles[type]} w-8 content-center`}>
          {SVG(type, background)}
        </div>
        <div
          className={`${type === 'done' ? 'translate-y-5' : 'translate-y-1'} my-6 -translate-x-4`}
        >
          {type === 'current' || (position == 'last' && type == 'done') ? (
            <p>
              <strong>{step}</strong>
            </p>
          ) : (
            <p>{step}</p>
          )}
          {type === 'done' && <time dateTime={date}>{date}</time>}
        </div>
      </div>
    </div>
  )
}

export default TimelineEntry
