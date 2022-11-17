import { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../lib/logger'
import { EmailEsrfApiRequestBody } from '../../lib/types'

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

  const body = req.body as EmailEsrfApiRequestBody

  try {
    process.env.PASSPORT_STATUS_API_BASE_URI
      ? await emailEsrfApi(res, body)
      : emailEsrfMock(res)
  } catch (error) {
    logger.error(error)
    res.status(500).send('Something went wrong.')
  }
}

const emailEsrfApi = async (
  res: NextApiResponse<string>,
  emailEsrfApiRequestBody: EmailEsrfApiRequestBody
) => {
  if (!process.env.PASSPORT_STATUS_API_BASE_URI) {
    throw Error(
      'process.env.PASSPORT_STATUS_API_BASE_URI must not be undefined, null or empty'
    )
  }

  const body = {
    Client: {
      BirthDate: {
        Date: emailEsrfApiRequestBody.dateOfBirth,
      },
      PersonContactInformation: {
        ContactEmailID: emailEsrfApiRequestBody.email,
      },
      PersonName: {
        PersonGivenName: [emailEsrfApiRequestBody.givenName],
        PersonSurName: emailEsrfApiRequestBody.surname,
      },
    },
  }

  const response = await fetch(
    `${process.env.PASSPORT_STATUS_API_BASE_URI}/api/v1/esrf-requests`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  res.status(response.status).send(response.statusText)
}

/**
 * Unless there is an error in the network communication or bad data format,
 * we expect the response to always be a 202 to protect the users data.
 */
const emailEsrfMock = (res: NextApiResponse<string>) => {
  res.status(202).send('Email sent if found')
}
