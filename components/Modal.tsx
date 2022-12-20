import { FC, ReactNode, useEffect, useId, useRef } from 'react'
import ActionButton, { ActionButtonProps } from './ActionButton'
import { FocusOn } from 'react-focus-on'

export interface ModalProps {
  actionButtons: ActionButtonProps[]
  children: ReactNode
  header: string
  onClose: EventListener
  open: boolean
}

const Modal: FC<ModalProps> = ({
  actionButtons,
  children,
  header,
  onClose,
  open,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const id = useId()

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    el?.addEventListener('close', onClose)
    return () => {
      el?.removeEventListener('close', onClose)
    }
  }, [onClose])

  // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]

  return (
    <dialog
      ref={dialogRef}
      className="border-none bg-transparent w-full md:w-2/3 lg:w-2/5 p-1 backdrop:bg-black backdrop:bg-opacity-80"
    >
      <FocusOn enabled={open}>
        <section
          data-autofocus
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
              <ActionButton
                key={actionButtonProps.text}
                {...actionButtonProps}
              />
            ))}
          </div>
        </section>
      </FocusOn>
    </dialog>
  )
}

export default Modal
