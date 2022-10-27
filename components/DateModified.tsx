import { FC } from 'react'

export interface DateModifiedProps {
  // text to be displayed
  text?: string

  // id of the element for testing if needed
  id?: string
}

/**
 * Contains build time stamp
 */
const DateModified: FC<DateModifiedProps> = ({ id, text }) => {
  return (
    <time>
      <dl id={id} className="container mx-auto pl-6">
        <dt className="inline">{text}</dt>
        <dd className="inline">{process.env.NEXT_PUBLIC_BUILD_DATE}</dd>
      </dl>
    </time>
  )
}

DateModified.defaultProps = {
  id: 'date-modified',
  text: 'Date Modified: ',
}

export default DateModified
