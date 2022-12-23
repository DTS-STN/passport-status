import { FC } from 'react'

export interface BannerProps {
  alert: string
  description: string
}

const Banner: FC<BannerProps> = ({ alert, description }) => {
  return (
    <div className="bg-blue-normal font-body text-white">
      <div className="container mx-auto p-4 flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
        <div
          className="border-2 px-4 py-1 whitespace-nowrap w-max"
          role="alert"
        >
          <b>{alert}</b>
        </div>
        <div>{description}</div>
      </div>
    </div>
  )
}

export default Banner
