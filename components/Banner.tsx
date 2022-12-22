import { FC } from 'react'

export interface BannerProps {
  alert: string
  description: string
}

const Banner: FC<BannerProps> = ({ alert, description }) => {
  return (
    <div className="bg-blue-normal">
      <div className="container mx-auto px-4 py-4 flex-1 block lg:flex">
        <div className="flex justify-between lg:block lg:w-max">
          <span
            className="font-body text-white border-2 block w-max px-4 py-1 my-auto leading-6 items-center"
            role="alert"
          >
            <b>{alert}</b>
          </span>
        </div>
        <div className="lg:ml-4 xl:ml-8 xxl:ml-12">
          <p className="mt-2 lg:mt-0 h-full font-body text-white lg:ml-4 my-auto flex items-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Banner
