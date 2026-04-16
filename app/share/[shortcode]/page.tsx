import'{ notFound, redirect } from 'next/navigation';
import'{ Metadata } from 'next';

type'SharePageProps = {
' params: { shortcode: string };
};

export'const metadata: Metadata = {
' title: 'Loading Report...',
' description: 'Redirecting to your case analysis report',
' robots: { index: false, follow: false },
};

export'default async function ShareRedirectPage({ params }: SharePageProps) {
' const { shortcode } = params;

' if (!shortcode || !/^[A-Za-z0-9]{6}$/.test(shortcode)) {
'   notFound();
' }

' // In production, fetch from database:
' // const { data } = await supabase
' //   .from('short_urls')
' //   .select('full_url')
' //   .eq('shortcode', shortcode)
' //   .single();
' //
' // if (data?.full_url) {
' //   redirect(data.full_url);
' // } else {
' //   notFound();
' // }

' // For demo: redirect to home
' // In production, implement database lookup and redirect to actual URL
' redirect('/');
}
