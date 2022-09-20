import PropTypes from 'prop-types'

export default function InputErrorMessage(props) {
  return <div className="text-red-600 font-bold">{props.message}</div>
}

InputErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}
