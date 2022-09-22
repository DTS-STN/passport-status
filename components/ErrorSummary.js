import PropTypes from 'prop-types'

export default function ErrorSummary(props) {
  return (
    <section
      id={props.id}
      className="border-l-6 border-accent-error mb-6 ml-2.5 pl-4"
    >
      <h2 className="text-2xl pt-4 ml-4">{props.summary}</h2>
      <ul className="list-disc pb-6 ml-4">
        {props.errors.map((error, index) => {
          return (
            <li key={index}>
              <a
                className="visited:text-link-default"
                href={`#${error.feildId}`}
              >
                {error.errorMessage}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

ErrorSummary.propTypes = {
  id: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
}
