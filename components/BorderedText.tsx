import { FC } from 'react'

/** Component that shows provided text inside a border. Meant to highlight important text such as indicating a work in progress or a test site */
export interface BorderedTextProps {
  children: React.ReactNode
  customStyle?: string
}

const BorderedText: FC<BorderedTextProps> = ({ children, customStyle }) => {
  return (
    <div
      className={`${
        customStyle ? customStyle : ''
      } border-4 border-black p-2 mb-4 w-max`}
    >
      {children}
    </div>
  )
}

export default BorderedText
