/* istanbul ignore next */
export default function handler(req, res) {
  res.status(200).json({ apiEnv: process.env.ENV_EXAMPLE })
}
