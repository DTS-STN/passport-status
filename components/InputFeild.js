import PropTypes from 'prop-types'
import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'

export default function InputFeild(props) {
  return (
    <div className="block mb-4" id={`input-${props.id}`} data-testid={props.id}>
      <InputLabel
        id={props.id}
        required={props.required}
        label={props.label}
        textRequired={props.textRequired}
      />
      {props.errorMessage ? (
        <InputErrorMessage message={props.errorMessage} />
      ) : null}
      <input
        className={`block h-9 py-1.5 px-3 border rounded ${
          props.errorMessage ? 'border-accent-error' : 'border-neutral-400'
        } focus:outline-none focus:border-sky-500 focus:ring-sky-500`}
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        aria-required={props.required}
        aria-invalid={props.error}
      />
    </div>
  )
}

InputFeild.defaultProps = {
  type: 'text',
}

InputFeild.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  textRequired: PropTypes.string,
  errorMessage: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'date']),
}
