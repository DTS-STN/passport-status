import { FC, ReactNode, useId } from 'react'
import ActionButton, { ActionButtonProps } from './ActionButton'
import { FocusOn } from 'react-focus-on'

export interface ModalProps {
  actionButtons: ActionButtonProps[]
  open: boolean
  header: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ actionButtons, header, open, children }) => {
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
          aria-describedby={`${id}-modal-header`}
          className="mx-4 bg-white ring-2 ring-gray-modal md:w-2/3 lg:w-2/5 rounded"
        >
          <header
            id={`${id}-modal-header`}
            className="bg-blue-deep text-white p-3 border-b border-black rounded-t"
          >
            <h2>{header}</h2>
          </header>
          <div id={`${id}-modal-desc`} className="p-3">
            {children}
          </div>
          <div className="flex gap-2 justify-end p-2 border-t border-gray-modal">
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
