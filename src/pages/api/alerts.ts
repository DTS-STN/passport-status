import { NextApiRequest, NextApiResponse } from 'next'

import { Alert, AlertApiResponse, AlertMeta } from '../../lib/types'

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

  let jsonAlerts: AlertMeta[] = [
    {
      uid: '12345',
      pages: ['expectations', 'landing'],
      position: 'bottom',
      textEn: '**TEST** ALERT',
      textFr: '[FR] TEST ALERT',
      type: 'info',
      validFrom: fromDate,
      validTo: toDate,
    },
  ]

  let alerts: Alert[] = jsonAlerts
    .filter((alert) => alert.validFrom <= today && alert.validTo >= today)
    .map((alert) => ({
      uid: alert.uid,
      position: alert.position,
      textEn: alert.textEn,
      textFr: alert.textFr,
      type: alert.type,
    }))

  return res.status(200).json({
    alerts,
  })
}
