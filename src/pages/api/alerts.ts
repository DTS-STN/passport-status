import { NextApiRequest, NextApiResponse } from 'next'

import {
  Alert,
  AlertApiResponse,
  AlertJson,
  AlertPage,
  AlertPosition,
  AlertType,
} from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AlertApiResponse | string>
) {
  if (req.method !== 'GET') {
    res.status(405).send(`Invalid request method ${req.method}`)
    return
  }

  let fromDate = new Date()
  fromDate.setDate(fromDate.getDate() - 1)

  let toDate = new Date()
  toDate.setDate(toDate.getDate() + 1)

  let today = new Date()

  // let res = await fetch(JSON_URL)

  let jsonAlerts: AlertJson[] = [
    {
      pages: [AlertPage.STATUS, AlertPage.LANDING],
      position: 'top',
      textEn: 'TEST ALERT',
      textFr: '[FR] TEST ALERT',
      type: 'info',
      validFrom: fromDate,
      validTo: toDate,
    },
  ]

  let alerts: Alert[] = jsonAlerts
    .filter((alert) => alert.validFrom <= today && alert.validTo >= today)
    .map((alert) => ({
      position: alert.position,
      textEn: alert.textEn,
      textFr: alert.textFr,
      type: alert.type,
    }))

  console.log('Alerts:', JSON.stringify(alerts))

  res.status(200).json({
    alerts,
  })
}
