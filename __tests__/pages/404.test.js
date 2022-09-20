/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Custom404 from '../../pages/404'
import { getStaticProps } from '../../pages/404'

// 'Mock' call to fetchContent
jest.mock('../../lib/cms', () => ({
  fetchContent: () => {
    return {}
  },
}))

describe('404', () => {
  it('renders 404 without crashing', () => {
    render(<Custom404 />)
    expect(
      screen.getByText('An error 404 occured on server')
    ).toBeInTheDocument()
  })

  it('Test getStaticProps', async () => {
    const props = await getStaticProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        locale: 'en',
        meta: {
          data_en: {
            title: 'Next Template - 404',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
          },
          data_fr: {
            title: 'Next Template - 404',
            desc: 'Français',
            author: 'Service Canada',
            keywords: '',
          },
        },
      },
    })
  })
})
