import mock from '../../__mocks__/statusMock'

export default function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Invalid Request' })

  //temporary mock lookup
  let status = mock[req.body.givenName.toLowerCase()]

  if (status) {
    return res.status(200).json({ status: status })
  } else {
    return res.status(404).send({ message: 'Not Found' })
  }
}
