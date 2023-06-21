import { NextApiRequest, NextApiResponse } from 'next'

import { Alert, AlertJsonResponse } from '../../lib/types'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('get-alerts')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Alert[] | string>
) {
  if (!process.env.ALERT_JSON_URI) {
    logger.error('ALERT_JSON_URI must not be undefined, null or empty')
    throw Error(
      'process.env.ALERT_JSON_URI must not be undefined, null or empty'
    )
  }

  if (req.method !== 'GET') {
    res.status(405).send(`Invalid request method ${req.method}`)
    return
  }

  const query = req.query
  const { page } = query

  let now = new Date()

  try {
    const alertJson = await fetch(process.env.ALERT_JSON_URI)
    const alertData: AlertJsonResponse = await alertJson.json()

    let alerts: Alert[] = alertData?.jsonAlerts
      .filter(
        (alert) =>
          alert.pages.find((alertPage) => alertPage === page) &&
          new Date(alert.validFrom) <= now &&
          new Date(alert.validTo) >= now
      )
      .map((alert) => ({
        uid: alert.uid,
        textEn: alert.textEn,
        textFr: alert.textFr,
        type: alert.type,
      }))

    return res.status(200).json(alerts)
  } catch (error) {
    // For alerts we want to silently fail, shouldn't show as a failure to the user.
    // We'll catch it in the logs, but to them it should just look like there are no alerts.
    logger.error(error, 'Failed to fetch alerts')
    res.status(200).json([])
  }
}
