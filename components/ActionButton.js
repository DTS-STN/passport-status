import PropTypes from 'prop-types'

export default function ActionButton(props) {
  let classStyle =
    'inline-block text-center align-middle rounded border py-2.5 px-3.5 focus:ring-2 focus:ring-offset-2'
  switch (props.style) {
    case 'primary':
      classStyle +=
        'border-blue-deep bg-blue-dark text-basic-white hover:bg-blue-normal'
      break
    default:
      classStyle +=
        'border-gray-default bg-gray-light text-blue-light hover:border-gray-deep hover:bg-gray-dark'
      break
  }

  return (
    <button className={classStyle} onClick={props.onClick} type={props.type}>
      {props.text}
    </button>
  )
}

ActionButton.defaultProps = {
  type: 'button',
  style: 'default',
}

ActionButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  text: PropTypes.string.isRequired,
  style: PropTypes.oneOf(['default', 'primary', 'super', 'danger']),
}
