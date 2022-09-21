import PropTypes from 'prop-types'

export default function ActionButton(props) {
  let classStyle =
    'inline-block text-center align-middle rounded border py-2.5 px-3.5 '
  switch (props.style) {
    case 'primary':
      classStyle += 'border-black bg-blue-900 text-gray-100 hover:bg-blue-800'
      break
    default:
      classStyle +=
        'border-gray-300 bg-gray-100 text-indigo-900 hover:bg-gray-200'
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
