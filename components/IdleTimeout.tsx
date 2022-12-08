import { deleteCookie } from 'cookies-next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { IIdleTimerProps, useIdleTimer } from 'react-idle-timer'
import Modal from './Modal'

export interface IdleTimeoutProps
  extends Pick<IIdleTimerProps, 'promptTimeout'>,
    Pick<IIdleTimerProps, 'timeout'> {}

const IdleTimeout: FC<IdleTimeoutProps> = ({ promptTimeout, timeout }) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const handleOnIdle = () => {
    deleteCookie('agreed-to-email-esrf-terms')
    router.reload()
  }

  const handleOnIdleContinueSession = () => {
    setModalOpen(false)
    // show existing modals
    document
      .querySelectorAll('[role="dialog"]')
      .forEach(function ({ parentElement }) {
        parentElement?.classList.remove('hidden')
        parentElement?.classList.add('flex')
      })
    reset()
  }

  const handleOnPrompt = () => {
    // hide existing modals
    document
      .querySelectorAll('[role="dialog"]')
      .forEach(function ({ parentElement }) {
        parentElement?.classList.remove('flex')
        parentElement?.classList.add('hidden')
      })

    setModalOpen(true)
  }

  const { reset } = useIdleTimer({
    onIdle: handleOnIdle,
    onPrompt: handleOnPrompt,
    promptTimeout: promptTimeout ?? 5 + 60 * 1000, //5 minutes
    timeout: timeout ?? 10 * 60 * 1000, //10 minutes
  })

  return (
    <Modal
      open={modalOpen}
      actionButtons={[
        {
          onClick: () => handleOnIdle(),
          style: 'primary',
          text: t('modal.idle-end-session'),
        },
        {
          onClick: handleOnIdleContinueSession,
          style: 'default',
          text: t('modal.idle-continue-session'),
        },
      ]}
    >
      {t('modal.idle')}
    </Modal>
  )
}

export default IdleTimeout
