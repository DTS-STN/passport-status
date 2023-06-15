import { FC, useEffect } from 'react'

import { useRemark } from 'react-remark'

export type MarkdownContentProps = {
  markdown: string
}

const MarkdownContent: FC<MarkdownContentProps> = ({ markdown }) => {
  const [reactContent, setMarkdownSource] = useRemark()

  useEffect(() => {
    setMarkdownSource(markdown)
  }, [markdown])

  return reactContent
}

export default MarkdownContent
