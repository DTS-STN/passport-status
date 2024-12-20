import { PropsWithChildren } from 'react'

import { TimelineEntryType, TimelinePositionType } from '../lib/types'

export interface TimelineEntryProps extends PropsWithChildren {
  type: TimelineEntryType
  step: string
  date?: string
  position: TimelinePositionType
  className?: string
  background?: boolean
}

const borderColors = {
  done: 'border-accent-warning',
  current: 'border-accent-success',
  future: 'black',
}

const topBorderStyle = (
  type: TimelineEntryType,
  position: TimelinePositionType,
) => {
  const style =
    type == 'future' ? 'border-dashed border-black' : 'border-accent-success'

  return position == 'first' ? 'border-transparent' : style
}

const bottomBorderStyle = (
  type: TimelineEntryType,
  position: TimelinePositionType,
) => {
  const style =
    type == 'done' ? 'border-accent-success' : 'border-dashed border-black'

  return position == 'last' ? 'border-transparent' : style
}

const svgStyles = {
  done: '-translate-x-8',
  current: '-translate-x-8 mt-1',
  future: '-translate-x-8',
}

const SVG = (type: TimelineEntryType, background: boolean | undefined) => {
  switch (type) {
    case 'done': {
      return (
        <svg
          className={`${background ? 'bg-slate-100' : 'bg-white'} h-8 w-8 fill-accent-success`}
          viewBox="0 0 460 460"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="m504 256c0 136.967-111.033 248-248 248s-248-111.033-248-248 111.033-248 248-248 248 111.033 248 248zm-276.686 131.314 184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0l-150.059 150.058-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
        </svg>
      )
    }
    case 'current': {
      return (
        <svg
          className={`${background ? 'bg-slate-100' : 'bg-white'} h-8 w-8`}
          viewBox="0 10 64 64"
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
          viewBox="0 4 64 64"
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
  children,
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
    <div className="flex flex-row">
      <div className="relative h-auto w-8">
        <div
          className={`-translate-x-2px absolute left-1/2 top-0 h-1/2 w-4 transform border-l-4 ${topBorderComputedStyle}`}
        />
        <div
          className={`-translate-x-2px absolute left-1/2 top-1/2 h-1/2 w-4 transform border-l-4 ${bottomBorderComputedStyle}`}
        />
      </div>
      <div className={`${svgStyles[type]} w-8 content-center`}>
        {SVG(type, background)}
      </div>
      <div className="-translate-x-2 translate-y-6">
        <p>{step}</p>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default TimelineEntry
