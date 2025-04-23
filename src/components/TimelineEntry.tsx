import { PropsWithChildren } from 'react'

import { TimelineEntryStatus, TimelinePosition } from '../lib/types'
import TimelineEntryContent from './TimelineEntryContent'

export interface TimelineEntryProps extends PropsWithChildren {
  type: TimelineEntryStatus
  step: string
  date?: string
  subtext?: string
  position: TimelinePosition
  className?: string
  background?: boolean
  stepIndex: number
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
  done: '-translate-x-0 -translate-y-0',
  current: '-translate-x-0',
  future: '-translate-x-0',
}

const SVG = (type: TimelineEntryStatus, background: boolean | undefined) => {
  switch (type) {
    case 'done': {
      return (
        <svg
          className={`${background ? 'bg-slate-100' : 'bg-white'} fill-accent-success h-9 w-9`}
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="green"
            stroke="green"
            strokeWidth="8"
          />
          <line
            x1="27"
            y1="43"
            x2="45"
            y2="23"
            stroke="white"
            strokeWidth="6"
          />
          <line
            x1="30"
            y1="44"
            x2="17"
            y2="33"
            stroke="white"
            strokeWidth="6"
          />
        </svg>
      )
    }
    case 'current': {
      return (
        <svg
          className={`${background ? 'bg-slate-100' : 'bg-white'} h-9 w-9`}
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="black"
            stroke="black"
            strokeWidth="8"
          />
        </svg>
      )
    }
    case 'future': {
      return (
        <svg
          className={`${background ? 'bg-slate-100' : 'bg-white'} h-9 w-9`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="none"
            stroke="black"
            strokeWidth="8"
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
  subtext,
  className,
  background,
  stepIndex,
}: TimelineEntryProps) => {
  const topBorderComputedStyle = topBorderStyle(type, position)
  const bottomBorderComputedStyle = bottomBorderStyle(type, position)

  return (
    <li className={className}>
      <div className="flex flex-row">
        <div className="align-center mr-2 flex flex-col justify-between">
          <div className="flex h-full w-full justify-center">
            <div
              className={`h-full w-0 border-r-2 border-l-2 ${topBorderComputedStyle}`}
            />
          </div>
          <div className={svgStyles[type]}>{SVG(type, background)}</div>
          <div className="flex h-full w-full justify-center">
            <div
              className={`h-full w-0 border-r-2 border-l-2 ${bottomBorderComputedStyle}`}
            />
          </div>
        </div>
        <div className={`my-8`}>
          <TimelineEntryContent
            type={type}
            position={position}
            topText={step}
            bottomDate={date}
            bottomText={subtext}
            stepIndex={stepIndex}
          />
        </div>
      </div>
    </li>
  )
}

export default TimelineEntry
