import { FC } from 'react'

import Markdown from 'markdown-to-jsx'

import ExternalLink from './ExternalLink'

export type MarkdownContentProps = {
  markdown: string
  header: boolean
}

const MarkdownContent: FC<MarkdownContentProps> = ({ markdown, header }) => (
  <Markdown
    options={{
      overrides: {
        h1: ({ node, ...props }) =>
          header ? (
            <h1 {...props} className="h2 mt-0" />
          ) : (
            <h2 {...props} className="h2 mt-0" />
          ),
        h2: ({ node, ...props }) =>
          header ? (
            <h2 {...props} className="h3 mt-0" />
          ) : (
            <h3 {...props} className="h3 mt-0" />
          ),
        h3: ({ node, ...props }) =>
          header ? (
            <h3 {...props} className="h4 mt-0" />
          ) : (
            <h4 {...props} className="h4 mt-0" />
          ),
        h4: ({ node, ...props }) =>
          header ? (
            <h4 {...props} className="h5 mt-0" />
          ) : (
            <h5 {...props} className="h5 mt-0" />
          ),
        h5: ({ node, ...props }) =>
          header ? (
            <h5 {...props} className="h6 mt-0" />
          ) : (
            <h6 {...props} className="h6 mt-0" />
          ),
        a: ({ children, href }) => (
          <ExternalLink href={href ?? ''}>{children}</ExternalLink>
        ),
        ul: ({ children }) => <ul className="list-disc ml-8">{children}</ul>,
      },
    }}
  >
    {markdown}
  </Markdown>
)

export default MarkdownContent
