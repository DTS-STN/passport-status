import PropTypes from 'prop-types'

export default function InputLabel(props) {
  return (
    <label htmlFor={props.id}>
      {props.required ? (
        <strong className="text-red-700" aria-hidden="true">
          *
        </strong>
      ) : null}
      {props.label}
      {props.required ? (
        <strong className="text-red-700">{props.textRequired}</strong>
      ) : null}
    </label>
  )
}

InputLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  textRequired: PropTypes.string,
}
