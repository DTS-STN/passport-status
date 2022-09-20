import React from 'react'
import Head from 'next/head'

export default function MetaData(props) {
  return (
    <>
      <Head>
        <title>{props.data.title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={props.data.desc} />
        <meta name="author" content={props.data.author} />
        <meta name="keywords" content={props.data.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
