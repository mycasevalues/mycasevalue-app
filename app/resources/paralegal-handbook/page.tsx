import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import dynamic from 'next/dynamic';

const ParalegalHandbookCapture = dynamic(() => import('@/components/ParalegalHandbookCapture'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)', fontSize: 14 }}>
      Loading PDF generator…
    </div>
  ),
});

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Paralegal Federal Court Handbook',
  description: 'Professional reference handbook for paralegals. Federal court structure, FRCP deadlines, statute of limitations quick reference, district directories, and essential navigation guides.',
  alternates: { canonical: `${SITE_URL}/resources/paralegal-handbook` },
  openGraph: {
    title: 'Paralegal Federal Court Handbook',
    description: 'Professional reference tool for paralegals working in federal court. Complete desk reference for procedures, deadlines, and court data.',
    type: 'website',
    url: `${SITE_URL}/resources/paralegal-handbook`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  keywords: 'paralegal handbook, federal court procedures, FRCP deadlines, statute of limitations, federal districts, paralegal reference, federal court guide',
};

export default function ParalegalHandbookPage() {
  return (
    <div className="min-h-screen bg-[var(--surf, #F6F5F2)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Paralegal Federal Court Handbook
          </h1>
          <p className="mt-4 text-lg text-[var(--link)]">
            Professional Reference Tool
          </p>
          <p className="mt-6 text-blue-50">
            A comprehensive desk reference for paralegals working in federal court. Complete reference for procedures, deadlines, statute of limitations, district information, and navigation guides.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Handbook Overview */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-[var(--color-text-muted)]">
            What's Inside
          </h2>
          <p className="mb-6 text-lg text-[var(--color-text-muted)]">
            This comprehensive 30-page professional handbook provides essential reference material for paralegals managing federal court cases. Keep it on your desk for quick answers to procedural questions, deadline calculations, and jurisdiction information.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded border border-[var(--bdr)] p-6">
              <h3 className="mb-3 font-semibold text-blue-900">Federal Court Structure</h3>
              <p className="text-[var(--color-text-muted)]">
                District courts, circuit courts, Supreme Court, magistrate judges, and Article III judges explained with clear jurisdiction boundaries.
              </p>
            </div>

            <div className="rounded border border-[var(--bdr)] p-6">
              <h3 className="mb-3 font-semibold text-blue-900">FRCP Deadline Reference</h3>
              <p className="text-[var(--color-text-muted)]">
                The 20 most critical Federal Rules of Civil Procedure deadlines with dates, requirements, and cross-references.
              </p>
            </div>

            <div className="rounded border border-[var(--bdr)] p-6">
              <h3 className="mb-3 font-semibold text-blue-900">SOL Quick Reference</h3>
              <p className="text-[var(--color-text-muted)]">
                Statute of limitations for all 84 Nature of Suit codes with applicable timeframes from REAL_DATA.
              </p>
            </div>

            <div className="rounded border border-[var(--bdr)] p-6">
              <h3 className="mb-3 font-semibold text-blue-900">District Directory & Rules</h3>
              <p className="text-[var(--color-text-muted)]">
                Complete listing of all 95 federal districts with states and PACER codes, plus local rules summaries for 20 largest districts.
              </p>
            </div>

            <div className="rounded border border-[var(--bdr)] p-6">
              <h3 className="mb-3 font-semibold text-blue-900">Procedural Guides</h3>
              <p className="text-[var(--color-text-muted)]">
                How to read dockets, serve process, navigate discovery timelines, and use PACER and CourtListener effectively.
              </p>
            </div>

            <div className="rounded border border-[var(--bdr)] p-6">
              <h3 className="mb-3 font-semibold text-blue-900">Motion & Filing Data</h3>
              <p className="text-[var(--color-text-muted)]">
                Common motion outcomes data, filing fee schedules, appeal costs, and data-driven insights for case management.
              </p>
            </div>
          </div>
        </section>

        {/* Key Topics Section */}
        <section className="mb-12 rounded bg-[var(--color-surface-1)] p-8">
          <h2 className="mb-6 text-2xl font-bold text-[var(--color-text-muted)]">
            30 Pages of Professional Reference Material
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 1-2:</span>
                <span>Cover and Table of Contents</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 3-4:</span>
                <span>Federal Court Structure Overview</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 5-7:</span>
                <span>FRCP Deadline Reference Card (20 critical deadlines)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 8-10:</span>
                <span>SOL Quick Reference for all 84 NOS codes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 11-12:</span>
                <span>Federal Filing Fee Schedule</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 13-16:</span>
                <span>District Court Directory (all 95 districts)</span>
              </li>
            </ul>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 17-19:</span>
                <span>Local Rules Key Facts (20 largest districts)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 20-21:</span>
                <span>PACER and CourtListener Navigation Guide</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 22-23:</span>
                <span>Common Motion Outcomes Data</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 24-25:</span>
                <span>How to Read a Docket</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 26-27:</span>
                <span>Service of Process Overview</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Pages 28-29:</span>
                <span>Discovery Timeline and Procedures</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">Page 30:</span>
                <span>About MyCaseValue and Disclaimer</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Email Capture Component */}
        <ParalegalHandbookCapture />

        {/* Additional Info */}
        <section className="mt-12 border-t border-[var(--bdr)] pt-8">
          <h2 className="mb-4 text-2xl font-bold text-[var(--color-text-muted)]">
            About This Handbook
          </h2>
          <p className="mb-4 text-[var(--color-text-muted)]">
            This handbook is designed for paralegals, law students, and legal professionals who work with federal court cases. It provides quick reference information for the most common procedural questions, deadline calculations, and court data lookups that arise in daily practice.
          </p>
          <p className="mb-4 text-[var(--color-text-muted)]">
            The handbook combines procedural guidance with data from the Federal Judicial Center Integrated Database and CourtListener. Statute of limitations data is sourced from REAL_DATA with all 84 Nature of Suit codes. District information reflects the current 95 federal judicial districts.
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            This handbook is not legal advice. Always verify current procedures, rules, and deadlines with the specific federal district where your case is filed. Local rules and standing orders may differ from national standards shown in this reference.
          </p>
        </section>
      </div>
    </div>
  );
}
