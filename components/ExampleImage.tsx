import { FC } from 'react'
import Image from 'next/image'

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
      <Image
        src={imageProps.src}
        alt={imageProps.alt}
        width={imageProps.width}
        height={imageProps.height}
      />
      <p>{description}</p>
    </>
  )
}

export default ExampleImage
