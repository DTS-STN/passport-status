import PropTypes from 'prop-types'
import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'

export default function InputTextFeild(props) {
  return (
    <div className="block bg-slate-200" data-testid={props.id}>
      <InputLabel
        id={props.id}
        required={props.required}
        label={props.label}
        textRequired={props.textRequired}
      />
      {props.error ? <InputErrorMessage message={props.errorMessage} /> : null}
      <input
        className={`${props.error ? 'border-red-600' : 'border-black'}`}
        id={props.id}
        name={props.name}
        type={props.type}
        aria-required={props.required}
        aria-invalid={props.error}
      />
    </div>
  )
}

InputTextFeild.defaultProps = {
  type: 'text',
}

InputTextFeild.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  textRequired: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
}
