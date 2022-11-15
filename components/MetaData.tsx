import React, { FC } from 'react'
import Head from 'next/head'

export interface MetaDataProps {
  title: string
  desc: string
  author: string
}

const MetaData: FC<MetaDataProps> = ({ author, desc, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={desc} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default MetaData
