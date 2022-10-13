import { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../lib/logger'

export interface EmailEsrfRequestBody {
  dateOfBirth: string
  email: string
  firstName: string
  lastName: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).send(`Invalid request method ${req.method}`)

  try {
    const response = await (process.env.PASSPORT_STATUS_API_BASE_URI
      ? EmailEsrfApi(req.body)
      : EmailEsrfMock(res))
    return res.status(response.status).send(response.statusText)
  } catch (error) {
    logger.error(error)
    return res.status(500).send('Something went wrong.')
  }
}

function EmailEsrfApi(rqBody: any): Promise<Response> {
  return fetch(
    `${process.env.PASSPORT_STATUS_API_BASE_URI}/api/v1/electronic-service-requests/`,
    { method: 'POST', body: rqBody }
  )
}

function EmailEsrfMock(res: NextApiResponse): Promise<Response> {
  return new Promise<Response>(() => res.status(202).send('Email sent'))
}
