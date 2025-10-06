import { PropsWithChildren, useEffect, useId, useRef } from 'react';

import { FocusOn } from 'react-focus-on';

import ActionButton, { ActionButtonProps } from './ActionButton';

export interface ModalProps extends PropsWithChildren {
  actionButtons: ActionButtonProps[];
  header: string;
  onClose: EventListener;
  open: boolean;
}

const Modal = ({ actionButtons, children, header, onClose, open }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    el?.addEventListener('close', onClose);
    return () => {
      el?.removeEventListener('close', onClose);
    };
  }, [onClose]);

  // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]

  return (
    <dialog
      ref={dialogRef}
      className="min-h-screen min-w-screen items-center justify-center border-none bg-black/70 p-1 backdrop-blur-md"
    >
      <div className="flex min-h-screen w-full items-center justify-center">
        <FocusOn enabled={open}>
          <section
            data-autofocus
            tabIndex={-1}
            className="ring-gray-modal rounded-md bg-white ring-2"
            aria-describedby={`${id}-modal-header`}
          >
            <header id={`${id}-modal-header`} className="bg-blue-deep rounded-t-md border-b border-black p-3 text-white">
              <h1>{header}</h1>
            </header>
            <div id={`${id}-modal-desc`} className="p-3">
              {children}
            </div>
            <div className="border-gray-modal flex justify-end gap-2 border-t p-2">
              {actionButtons.map((actionButtonProps) => (
                <ActionButton key={actionButtonProps.text} {...actionButtonProps} />
              ))}
            </div>
          </section>
        </FocusOn>
      </div>
    </dialog>
  );
};

export default Modal;
