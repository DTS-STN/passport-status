import PropTypes from 'prop-types'

export default function ErrorSummary(props) {
  return (
    <div id={props.id}>
      <p>{props.summary}</p>
      <ul>
        {props.errors.map((error, index) => {
          return (
            <li id={index}>
              <a href={`#${error.feildId}`}>{error.errorMessage}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ErrorSummary.propTypes = {
  id: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
}
