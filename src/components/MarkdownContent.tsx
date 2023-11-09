import { PropsWithChildren } from 'react'

import Markdown from 'markdown-to-jsx'

import ExternalLink from './ExternalLink'

const Link = ({ children, ...props }: PropsWithChildren<{ href: string }>) => (
  <ExternalLink {...props}>{children}</ExternalLink>
)

export type MarkdownContentProps = {
  markdown: string
  disableParsingRawHTML?: boolean
}

export const MarkdownContent = ({
  markdown,
  disableParsingRawHTML = true,
}: MarkdownContentProps) => (
  <Markdown
    options={{
      disableParsingRawHTML,
      overrides: {
        h1: {
          component: 'h2',
          props: { className: 'h2 mt-0' },
        },
        h2: {
          component: 'h3',
          props: { className: 'h3 mt-0' },
        },
        h3: {
          component: 'h4',
          props: { className: 'h4 mt-0' },
        },
        h4: {
          component: 'h5',
          props: { className: 'h5 mt-0' },
        },
        h5: {
          component: 'h6',
          props: { className: 'h6 mt-0' },
        },
        a: { component: Link },
        ul: {
          props: { className: 'mb-5 list-disc space-y-2 pl-10 last:mb-0' },
        },
      },
    }}
  >
    {markdown}
  </Markdown>
)
