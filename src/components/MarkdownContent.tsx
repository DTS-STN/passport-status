import { PropsWithChildren } from 'react'

import Markdown from 'markdown-to-jsx'

import ExternalLink from './ExternalLink'

export type MarkdownContentProps = {
  markdown: string
  header: boolean
}

const Heading1 = ({ children, ...props }: PropsWithChildren) => (
  <h1 {...props}>{children}</h1>
)

const Heading2 = ({ children, ...props }: PropsWithChildren) => (
  <h2 {...props}>{children}</h2>
)

const Heading3 = ({ children, ...props }: PropsWithChildren) => (
  <h3 {...props}>{children}</h3>
)

const Heading4 = ({ children, ...props }: PropsWithChildren) => (
  <h4 {...props}>{children}</h4>
)

const Heading5 = ({ children, ...props }: PropsWithChildren) => (
  <h5 {...props}>{children}</h5>
)

const Heading6 = ({ children, ...props }: PropsWithChildren) => (
  <h6 {...props}>{children}</h6>
)

const Link = ({ children, ...props }: PropsWithChildren<{ href: string }>) => (
  <ExternalLink {...props}>{children}</ExternalLink>
)

const MarkdownContent = ({ markdown, header }: MarkdownContentProps) => (
  <Markdown
    options={{
      overrides: {
        h1: {
          component: header ? Heading1 : Heading2,
          props: { className: 'h2 mt-0' },
        },
        h2: {
          component: header ? Heading2 : Heading3,
          props: { className: 'h3 mt-0' },
        },
        h3: {
          component: header ? Heading3 : Heading4,
          props: { className: 'h4 mt-0' },
        },
        h4: {
          component: header ? Heading4 : Heading5,
          props: { className: 'h5 mt-0' },
        },
        h5: {
          component: header ? Heading5 : Heading6,
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

export default MarkdownContent
