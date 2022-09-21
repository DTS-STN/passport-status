import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../../pages/home'
import { getStaticProps } from '../../pages/home'
import { useRouter } from 'next/router'
import en from '../../locales/home/en'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
jest.mock('../../components/InputFeild', () => () => {
  return <mock-modal data-testid="test-modal" />
})
jest.mock('../../components/ActionButton', () => () => {
  return <mock-modal data-testid="button-modal" />
})

describe('Home page', () => {
  en.heading = 'heading'
  const commonContent = {
    required: 'required',
  }

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page', () => {
    render(<Home locale="en" content={en} commonContent={commonContent} />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it('Test getStaticProps', async () => {
    const props = await getStaticProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        content: en,
        locale: 'en',
      },
    })
  })
})
