import { FC, useId } from 'react'
import ActionButton, { ActionButtonProps } from './ActionButton'
import { FocusOn } from 'react-focus-on'

export interface ModalProps {
  actionButtons: ActionButtonProps[]
  open: boolean
  header: string
  description: string
}

const Modal: FC<ModalProps> = ({
  actionButtons,
  header,
  description,
  open,
}) => {
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
          className="bg-white ring-2 ring-[#999] md:w-2/3 lg:w-2/5 rounded"
        >
          <header
            id={`${id}-modal-header`}
            className="bg-blue-deep text-white p-3 border-b border-black rounded-t"
          >
            <h2>{header}</h2>
          </header>
          <div id={`${id}-modal-desc`} className="p-3">
            {description}
          </div>
          <div className="flex gap-2 justify-end p-2 border-t border-[#999]">
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
