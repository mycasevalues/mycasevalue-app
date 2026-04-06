import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Document Intelligence',
  description: 'AI-powered legal document analysis tool',
  robots: { index: false },
  openGraph: {
    title: 'Document Intelligence',
    description: 'AI-powered legal document analysis tool',
    url: 'https://www.mycasevalues.com/attorney/document-intelligence',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
