import { NextApiRequest, NextApiResponse } from 'next'

import { EmailEsrfApiRequestBody } from '../../lib/types'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('email-esrf')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== 'POST') {
    logger.debug(`Status 405: Invalid request method ${req.method}`)
    return res.status(405).send(`Invalid request method ${req.method}`)
  }

  if (req.headers['content-type'] !== 'application/json') {
    logger.debug(
      `Status 415: Invalid media type ${req.headers['content-type']}`
    )
    return res
      .status(415)
      .send(`Invalid media type ${req.headers['content-type']}`)
  }

  const body = req.body as EmailEsrfApiRequestBody

  try {
    await emailEsrfApi(res, body)
  } catch (error) {
    logger.error(error, 'Unhandled exception: Internal Server Error (500)')
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
      PersonPreferredLanguage: {
        LanguageName:
          emailEsrfApiRequestBody.locale === 'fr' ? 'FRENCH' : 'ENGLISH',
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
  logger.debug(`Status ${response.status}: ${response.statusText}`)
  res.status(response.status).send(response.statusText)
}
