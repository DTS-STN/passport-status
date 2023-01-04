import { FC } from 'react'
import Image from 'next/future/image'

export interface ImageProps {
  src: string
  alt: string
  width: number
  height: number
}
export interface ExampleImageProps {
  title: string
  imageProps: ImageProps
  description: string
}

const ExampleImage: FC<ExampleImageProps> = ({
  title,
  imageProps,
  description,
}) => {
  return (
    <>
      <p>
        <strong>{title}</strong>
      </p>
      <figure className="md:w-3/5 bg-white rounded-lg drop-shadow-lg border mb-6 p-1">
        <Image
          src={imageProps.src}
          alt={imageProps.alt}
          width={imageProps.width}
          height={imageProps.height}
          className="w-full"
        />
        <figcaption className="px-5 py-3 text-lg">
          <strong>{description}</strong>
        </figcaption>
      </figure>
    </>
  )
}

export default ExampleImage
