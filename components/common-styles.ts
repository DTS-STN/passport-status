//this file must be in components to work (tailwind won't see the classes and won't export them for use)
export function GetButtonStyle(
  style?: 'default' | 'primary' | 'super' | 'danger'
): string {
  let classStyle =
    'inline-block text-center align-middle rounded border py-2 px-10 focus:ring-1 focus:ring-offset-2 focus:ring-black focus:text-basic-white '

  switch (style) {
    case 'primary':
      classStyle +=
        'border-blue-dark bg-blue-dark text-basic-white focus:bg-blue-normal hover:bg-blue-normal active:bg-blue-active'
      break
    default:
      classStyle +=
        'border-gray-default bg-gray-light text-blue-light hover:border-gray-deep hover:bg-gray-dark'
      break
  }

  return classStyle
}
