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

  const query = req.query
  const { page } = query

  let fromDate = new Date()
  fromDate.setDate(fromDate.getDate() - 1)

  let toDate = new Date()
  toDate.setDate(toDate.getDate() + 1)

  let today = new Date()

  // let res = await fetch(JSON_URL)

  let jsonAlerts: AlertMeta[] = [
    {
      uid: '12345',
      pages: ['all', 'expectations', 'landing'],
      position: 'bottom',
      textEn: '**TEST** ALERT',
      textFr: '[FR] TEST ALERT',
      type: 'danger',
      validFrom: fromDate,
      validTo: toDate,
    },
    {
      uid: '12346',
      pages: ['expectations', 'landing'],
      position: 'top',
      textEn: '# **TEST**\n## [ALERT 2](https://www.canada.ca)',
      textFr: '[FR] TEST ALERT 2',
      type: 'danger',
      validFrom: fromDate,
      validTo: toDate,
    },
    {
      uid: '12347',
      pages: ['expectations'],
      position: 'bottom',
      textEn: 'ALERT __as well__',
      textFr: '[FR] TEST ALERT',
      type: 'success',
      validFrom: fromDate,
      validTo: toDate,
    },
  ]

  let alerts: Alert[] = jsonAlerts
    .filter(
      (alert) =>
        alert.pages.find(
          (alertPage) => alertPage === 'all' || alertPage === page
        ) &&
        alert.validFrom <= today &&
        alert.validTo >= today
    )
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
