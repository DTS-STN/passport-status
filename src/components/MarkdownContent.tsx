import { FC } from 'react'

import ReactMarkdown from 'react-markdown'

import ExternalLink from './ExternalLink'

export type MarkdownContentProps = {
  markdown: string
}

const MarkdownContent: FC<MarkdownContentProps> = ({ markdown }) => (
  <ReactMarkdown
    components={{
      h1: ({ node, ...props }) => <h1 {...props} className="h1 mt-0" />,
      h2: ({ node, ...props }) => <h2 {...props} className="h2 mt-0" />,
      h3: ({ node, ...props }) => <h3 {...props} className="h3 mt-0" />,
      h4: ({ node, ...props }) => <h4 {...props} className="h4 mt-0" />,
      a: ({ children, href }) => (
        <ExternalLink href={href ?? ''}>{children}</ExternalLink>
      ),
    }}
  >
    {markdown}
  </ReactMarkdown>
)

export default MarkdownContent
