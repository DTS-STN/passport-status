import React, { useState, useEffect } from 'react'

export default function ServerSideExample(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('api/envAPIExample')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])
  return (
    <>
      <div role="main" className="container mx-auto px-6 my-5 p-12">
        <h2 className="text-4xl font-bold">Server Side Example</h2>
        <div className="py-4">
          <h3 className="text-2xl">NEXT_PUBLIC_ENV_EXAMPLE</h3>
          <p>
            JSX:{' '}
            <span className="text-orange-700">
              {process.env.NEXT_PUBLIC_ENV_EXAMPLE
                ? process.env.NEXT_PUBLIC_ENV_EXAMPLE
                : 'undefined'}
            </span>
          </p>
          <p>
            Props:{' '}
            <span className="text-orange-700">
              {props.nextPublicExampleEnv}
            </span>
          </p>
        </div>
        <div className="py-4">
          <h3 className="text-2xl">ENV_EXAMPLE</h3>
          <p>
            JSX:{' '}
            <span className="text-orange-700">
              {process.env.ENV_EXAMPLE ? process.env.ENV_EXAMPLE : 'undefined'}
            </span>
          </p>
          <p>
            Props: <span className="text-orange-700">{props.exampleEnv}</span>
          </p>
        </div>
        <div className="py-4">
          <h3 className="text-2xl">API Example</h3>
          <p>
            Api:{' '}
            <span className="text-orange-700">
              {data ? data?.apiEnv : 'Loading'}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps({ locale }) {
  const meta = {
    data_en: {
      title: 'Next Template - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Next Template - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: {
      locale,
      meta,
      nextPublicExampleEnv:
        process.env.NEXT_PUBLIC_ENV_EXAMPLE ?? 'Env variable not set',
      exampleEnv: process.env.ENV_EXAMPLE ?? 'Env variable not set',
    },
  }
}
