import { MouseEventHandler } from 'react'

import { CheckStatusApiResponse, StatusCode } from '../lib/types'
import ActionButton, { ActionButtonStyle } from './ActionButton'
import CheckStatusFileBeingProcessed from './check-status-responses/CheckStatusFileBeingProcessed'
import CheckStatusNoRecord from './check-status-responses/CheckStatusNoRecord'
import CheckStatusNotAcceptable from './check-status-responses/CheckStatusNotAcceptable'
import CheckStatusPrinting from './check-status-responses/CheckStatusPrinting'
import CheckStatusReadyForPickup from './check-status-responses/CheckStatusReadyForPickup'
import CheckStatusShippingCanadaPost from './check-status-responses/CheckStatusShippingCanadaPost'
import CheckStatusShippingFedex from './check-status-responses/CheckStatusShippingFedex'

export interface CheckStatusInfoProps {
  id: string
  onGoBackClick: MouseEventHandler<HTMLButtonElement>
  goBackText: string
  goBackStyle?: ActionButtonStyle
  checkStatusResponse?: CheckStatusApiResponse | null
}

export const CheckStatusInfo = ({
  goBackText,
  id,
  onGoBackClick,
  goBackStyle,
  checkStatusResponse,
}: CheckStatusInfoProps) => {
  //Determine which status response to render
  let statusComponent
  switch (checkStatusResponse?.status) {
    case StatusCode.FILE_BEING_PROCESSED:
      statusComponent = <CheckStatusFileBeingProcessed />
      break
    case StatusCode.PASSPORT_ISSUED_READY_FOR_PICKUP:
      statusComponent = <CheckStatusReadyForPickup />
      break
    case StatusCode.PASSPORT_IS_PRINTING:
      statusComponent = <CheckStatusPrinting />
      break
    case StatusCode.PASSPORT_ISSUED_SHIPPING_CANADA_POST:
      statusComponent = (
        <CheckStatusShippingCanadaPost
          trackingNumber={checkStatusResponse.manifestNumber}
        />
      )
      break
    case StatusCode.PASSPORT_ISSUED_SHIPPING_FEDEX:
      statusComponent = (
        <CheckStatusShippingFedex
          trackingNumber={checkStatusResponse.manifestNumber}
        />
      )
      break
    case StatusCode.NOT_ACCEPTABLE_FOR_PROCESSING:
      statusComponent = <CheckStatusNotAcceptable />
      break
    default:
      statusComponent = <CheckStatusNoRecord />
      break
  }
  return (
    <div id={id}>
      {statusComponent}
      <div className="my-8">
        <ActionButton
          onClick={onGoBackClick}
          text={goBackText}
          style={goBackStyle}
        />
      </div>
    </div>
  )
}

export default CheckStatusInfo
