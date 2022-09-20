import propTypes from 'prop-types'

/**
 * Contains build time stamp
 */
export default function DateModified(props) {
  return (
    <dl id={props.id} className="container mx-auto pl-6">
      <dt className="inline">{props.text}</dt>
      <dd className="inline">{process.env.NEXT_PUBLIC_BUILD_DATE}</dd>
    </dl>
  )
}

DateModified.defaultProps = {
  id: 'date-modified',
  text: 'Date Modified:',
}

DateModified.propTypes = {
  // text to be displayed
  text: propTypes.string,

  // id of the element for testing if needed
  id: propTypes.string,
}
