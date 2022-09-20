import { fetchContent } from '../../lib/cms'

describe('cms library', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...process.env,
      NEXT_CMS_URL: 'test url',
    }
  })

  it('test cms fetch content', () => {
    return fetchContent().then((data) => {
      expect(data.header).toBe('Hello World!')
    })
  })
})
