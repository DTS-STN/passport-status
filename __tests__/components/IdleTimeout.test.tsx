import { FC } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import IdleTimeout from '../../components/IdleTimeout'
import { ModalProps } from '../../components/Modal'

const ModalMock: FC<ModalProps> = ({ open }: ModalProps) => {
  return <div data-testid="modal">{open ? 'modal-opened' : 'modal-closed'}</div>
}

jest.mock('../../components/Modal', () => ModalMock)

describe('IdleTimeout', () => {
  let modal: HTMLElement

  it('renders with modal closed', () => {
    render(<IdleTimeout timeout={1000} />)
    modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
    expect(modal.textContent).toMatch('modal-closed')
  })

  it('renders with modal opened after 1 second timeout', () => {
    setTimeout(function () {
      expect(modal.textContent).toMatch('modal-opened')
    }, 2000)
  })
})
