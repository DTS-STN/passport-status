export interface DateModifiedProps {
  // text to be displayed
  text?: string

  // id of the element for testing if needed
  id?: string
}

/**
 * Contains build time stamp
 */
const DateModified = ({
  id = 'date-modified',
  text = 'Date Modified: ',
}: DateModifiedProps) => {
  return (
    <dl id={id} className="container mx-auto px-4 py-8">
      <dt className="inline">{text}</dt>
      <dd className="inline">
        <time>{process.env.NEXT_PUBLIC_BUILD_DATE}</time>
      </dd>
    </dl>
  )
}

export default DateModified
