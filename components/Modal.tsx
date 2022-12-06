import { FC, ReactNode, useId } from 'react'
import ActionButton, { ActionButtonProps } from './ActionButton'
import { FocusOn } from 'react-focus-on'

export interface ModalProps {
  actionButtons: ActionButtonProps[]
  children: ReactNode
  open: boolean
}

const Modal: FC<ModalProps> = ({ actionButtons, children, open }) => {
  const id = useId()
  if (!open) return <></>
  return (
    <FocusOn autoFocus={false}>
      <div
        className="fixed top-0 left-0 w-screen h-full flex justify-center items-center"
        style={{ background: 'rgba(71, 71, 71, 0.8)' }}
      >
        <div
          role="dialog"
          aria-describedby={`${id}-modal-desc`}
          className="mx-4 p-4 bg-white border-2 border-black md:w-2/3 lg:w-2/5"
        >
          <div id={`${id}-modal-desc`} className="mb-4">
            {children}
          </div>
          <div className="flex gap-2 justify-center">
            {actionButtons.map((actionButtonProps) => (
              <ActionButton
                key={actionButtonProps.text}
                {...actionButtonProps}
              />
            ))}
          </div>
        </div>
      </div>
    </FocusOn>
  )
}

export default Modal
