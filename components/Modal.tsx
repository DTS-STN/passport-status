import { FC, ReactNode, useEffect, useId, useRef } from 'react'
import ActionButton, { ActionButtonProps } from './ActionButton'

export interface ModalProps {
  actionButtons: ActionButtonProps[]
  open: boolean
  header: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ actionButtons, header, open, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const id = useId()

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="border-none bg-transparent w-full md:w-2/3 lg:w-2/5 p-1 backdrop:bg-black backdrop:bg-opacity-80"
    >
      <section
        tabIndex={-1}
        className="bg-white rounded-md ring-2 ring-gray-modal"
        aria-describedby={`${id}-modal-header`}
      >
        <header
          id={`${id}-modal-header`}
          className="bg-blue-deep text-white p-3 border-b border-black rounded-t-md"
        >
          <h2>{header}</h2>
        </header>
        <div id={`${id}-modal-desc`} className="p-3">
          {children}
        </div>
        <div className="flex gap-2 justify-end p-2 border-t border-gray-modal">
          {actionButtons.map((actionButtonProps) => (
            <ActionButton key={actionButtonProps.text} {...actionButtonProps} />
          ))}
        </div>
      </section>
    </dialog>
  )
}

export default Modal
