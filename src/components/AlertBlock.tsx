import { FC } from 'react'

import { Alert, AlertPosition } from '../lib/types'
import AlertSection from './AlertSection'
import MarkdownContent from './MarkdownContent'

export interface AlertBlockProps {
  position: AlertPosition
  alerts: Alert[] | undefined
}

const AlertBlock: FC<AlertBlockProps> = ({ position, alerts }) => {
  return (
    <>
      {alerts
        ?.filter((alert) => alert.position == position)
        .map((alert) => {
          return (
            <AlertSection key={alert.uid} type={alert.type}>
              <MarkdownContent markdown={alert.textEn} />
            </AlertSection>
          )
        })}
    </>
  )
}

export default AlertBlock
