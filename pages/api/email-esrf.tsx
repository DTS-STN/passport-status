import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import logger from '../../lib/logger'

export interface EmailEsrfRequestBody {
  dateOfBirth: string
  email: string
  firstName: string
  lastName: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== 'POST') {
    res.status(405).send(`Invalid request method ${req.method}`)
    return
  }

  if (req.headers['content-type'] !== 'application/json') {
    res.status(415).send(`Invalid media type ${req.headers['content-type']}`)
    return
  }

  try {
    const response = await (process.env.PASSPORT_STATUS_API_BASE_URI
      ? emailEsrfApi(req.body)
      : emailEsrfMock())

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText)
    }

    res.status(response.status).send(response.statusText)
  } catch (error) {
    logger.error(error)

    if ((error as Error).constructor.name === 'ApiError') {
      const apiError = error as ApiError
      res.status(apiError.statusCode).send(apiError.message)
      return
    }

    res.status(500).send('Something went wrong.')
  }
}

const emailEsrfApi = (body: any) => {
  return fetch(
    `${process.env.PASSPORT_STATUS_API_BASE_URI}/api/v1/electronic-service-requests`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
}

const emailEsrfMock = async () => {
  //unless there is an error in the network communication or bad data format,
  //we expect the response to always be a 202 to protect the users data
  return new Response(null, { status: 202, statusText: 'Email sent if found' })
}
