import PropTypes from 'prop-types'

export default function InputErrorMessage(props) {
  return (
    <span className="font-bold border-l-4 border-red-dark mb-1 px-2 bg-red-light inline-block">
      {props.message}
    </span>
  )
}

InputErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}
