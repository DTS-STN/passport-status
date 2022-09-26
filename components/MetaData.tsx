import React, { FC } from 'react'
import Head from 'next/head'

export interface MetaDataProps {
  data: {
    title: string
    desc: string
    author: string
    keywords: string
  }
}

const MetaData: FC<MetaDataProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={data.desc} />
        <meta name="author" content={data.author} />
        <meta name="keywords" content={data.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default MetaData
