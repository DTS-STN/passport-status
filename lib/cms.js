export async function fetchContent() {
  const res = undefined
  return res ? res : exampleResponse()
}

async function exampleResponse() {
  console.log(
    'Please replace this example response with a CMS call and error handling'
  )
  return { header: 'Hello World!', paragraph: 'Add your content here' }
}
