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
      : EmailEsrfMock(req.body))
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

function EmailEsrfMock(_rqBody: any): Promise<Response> {
  //unless there is an error in the network communication or bad data format,
  //we expect the response to always be a 202 to protect the users data
  return new Promise<Response>(
    () => new Response(null, { status: 200, statusText: 'Email sent if found' })
  )
}
