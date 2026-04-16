import'type { Metadata } from 'next'
import'{ SITE_URL } from '@/lib/site-config'

export'const metadata: Metadata = {
' title: 'Document Intelligence',
' description: 'AI-powered legal document analysis tool',
' robots: { index: false },
' openGraph: {
'   title: 'Document Intelligence',
'   description: 'AI-powered legal document analysis tool',
'   url: `${SITE_URL}/attorney/document-intelligence`,
' },
}

export'default function Layout({
' children,
}:'{
' children: React.ReactNode
})'{
' return children
}
