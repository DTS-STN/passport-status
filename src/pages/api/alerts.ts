import { NextApiRequest, NextApiResponse } from 'next'

import { Alert, AlertJsonResponse } from '../../lib/types'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('get-alerts')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Alert[] | string>,
) {
  try {
    if (!process.env.ALERT_JSON_URI) {
      logger.error('ALERT_JSON_URI must not be undefined, null or empty')
      throw Error(
        'process.env.ALERT_JSON_URI must not be undefined, null or empty',
      )
    }

    if (req.method !== 'GET') {
      logger.debug(`error 405: Invalid request method ${req.method}`)
      return res.status(405).send(`Invalid request method ${req.method}`)
    }

    const query = req.query
    const { page } = query

    const now = new Date()

    const alertJson = await fetch(process.env.ALERT_JSON_URI, {
      headers: { 'Cache-Control': 'max-age=600' },
    })
    const alertData: AlertJsonResponse = await alertJson.json()

    const validAlerts = alertData?.jsonAlerts.filter(
      (alert) =>
        new Date(alert.validFrom) <= now && new Date(alert.validTo) >= now,
    )

    const pageAlerts = page
      ? validAlerts.filter(
          (alert) => alert.pages?.find((alertPage) => alertPage === page),
        )
      : validAlerts.filter(
          (alert) => alert.pages === undefined || alert.pages?.length === 0,
        )

    const alerts: Alert[] = pageAlerts.map((alert) => ({
      uid: alert.uid,
      textEn: alert.textEn,
      textFr: alert.textFr,
      type: alert.type,
    }))

    return res.status(200).json(alerts)
  } catch (error) {
    // If there's a problem with the alerts, we return 500 but with an empty list
    logger.error(error, 'Failed to fetch alerts')
    return res.status(500).json([])
  }
}
