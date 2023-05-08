import { FC } from 'react'

import { Trans } from 'next-i18next'
import Image from 'next/image'

export interface ImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export interface ExampleImageProps {
  title?: string
  imageProps: ImageProps
  descriptionKey: string
  descriptionNamespace: string
}

const ExampleImage: FC<ExampleImageProps> = ({
  title,
  imageProps,
  descriptionKey,
  descriptionNamespace,
}) => {
  return (
    <>
      {title && (
        <p>
          <strong>{title}</strong>
        </p>
      )}
      <figure className="mb-6 rounded-lg border bg-white p-1 drop-shadow-lg md:w-3/5">
        <Image
          key={imageProps.src}
          className="w-full"
          alt={imageProps.alt}
          src={imageProps.src}
          width={imageProps.width}
          height={imageProps.height}
        />
        <figcaption className="px-5 py-3 text-lg">
          <Trans i18nKey={descriptionKey} ns={descriptionNamespace} />
        </figcaption>
      </figure>
    </>
  )
}

export default ExampleImage
