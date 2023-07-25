import { PropsWithChildren } from 'react'

export interface LayoutProps extends PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => <>{children}</>

export default Layout
