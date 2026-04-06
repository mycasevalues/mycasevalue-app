import { Metadata } from 'next';
import { ArrowRightIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Court Districts',
  description: 'All 94 federal judicial districts across 13 circuits. Explore case outcomes, win rates, and settlement data by district.',
  alternates: { canonical: `${SITE_URL}/districts` },
  openGraph: {
    title: 'Federal Court Districts | MyCaseValue',
    description: 'All 94 federal judicial districts across 13 circuits.',
    type: 'website',
    url: `${SITE_URL}/districts`,
  },
};

interface District {
  slug: string;
  name: string;
  abbr: string;
}

interface Circuit {
  name: string;
  districts: District[];
}

const CIRCUITS: Circuit[] = [
  {
    name: 'First Circuit',
    districts: [
      { slug: 'd-me', name: 'District of Maine', abbr: 'D. Me.' },
      { slug: 'd-nh', name: 'District of New Hampshire', abbr: 'D.N.H.' },
      { slug: 'd-mass', name: 'District of Massachusetts', abbr: 'D. Mass.' },
      { slug: 'd-ri', name: 'District of Rhode Island', abbr: 'D.R.I.' },
      { slug: 'd-pr', name: 'District of Puerto Rico', abbr: 'D.P.R.' },
    ],
  },
  {
    name: 'Second Circuit',
    districts: [
      { slug: 'd-vt', name: 'District of Vermont', abbr: 'D. Vt.' },
      { slug: 'd-conn', name: 'District of Connecticut', abbr: 'D. Conn.' },
      { slug: 'ndny', name: 'Northern District of New York', abbr: 'N.D.N.Y.' },
      { slug: 'sdny', name: 'Southern District of New York', abbr: 'S.D.N.Y.' },
      { slug: 'edny', name: 'Eastern District of New York', abbr: 'E.D.N.Y.' },
      { slug: 'wdny', name: 'Western District of New York', abbr: 'W.D.N.Y.' },
    ],
  },
  {
    name: 'Third Circuit',
    districts: [
      { slug: 'd-nj', name: 'District of New Jersey', abbr: 'D.N.J.' },
      { slug: 'edpa', name: 'Eastern District of Pennsylvania', abbr: 'E.D. Pa.' },
      { slug: 'mdpa', name: 'Middle District of Pennsylvania', abbr: 'M.D. Pa.' },
      { slug: 'wdpa', name: 'Western District of Pennsylvania', abbr: 'W.D. Pa.' },
      { slug: 'd-del', name: 'District of Delaware', abbr: 'D. Del.' },
      { slug: 'd-vi', name: 'District of the Virgin Islands', abbr: 'D.V.I.' },
    ],
  },
  {
    name: 'Fourth Circuit',
    districts: [
      { slug: 'd-md', name: 'District of Maryland', abbr: 'D. Md.' },
      { slug: 'edva', name: 'Eastern District of Virginia', abbr: 'E.D. Va.' },
      { slug: 'wdva', name: 'Western District of Virginia', abbr: 'W.D. Va.' },
      { slug: 'ndwv', name: 'Northern District of West Virginia', abbr: 'N.D.W.Va.' },
      { slug: 'sdwv', name: 'Southern District of West Virginia', abbr: 'S.D.W.Va.' },
      { slug: 'ednc', name: 'Eastern District of North Carolina', abbr: 'E.D.N.C.' },
      { slug: 'mdnc', name: 'Middle District of North Carolina', abbr: 'M.D.N.C.' },
      { slug: 'wdnc', name: 'Western District of North Carolina', abbr: 'W.D.N.C.' },
      { slug: 'd-sc', name: 'District of South Carolina', abbr: 'D.S.C.' },
    ],
  },
  {
    name: 'Fifth Circuit',
    districts: [
      { slug: 'edla', name: 'Eastern District of Louisiana', abbr: 'E.D. La.' },
      { slug: 'mdla', name: 'Middle District of Louisiana', abbr: 'M.D. La.' },
      { slug: 'wdla', name: 'Western District of Louisiana', abbr: 'W.D. La.' },
      { slug: 'ndms', name: 'Northern District of Mississippi', abbr: 'N.D. Miss.' },
      { slug: 'sdms', name: 'Southern District of Mississippi', abbr: 'S.D. Miss.' },
      { slug: 'edtx', name: 'Eastern District of Texas', abbr: 'E.D. Tex.' },
      { slug: 'ndtx', name: 'Northern District of Texas', abbr: 'N.D. Tex.' },
      { slug: 'sdtx', name: 'Southern District of Texas', abbr: 'S.D. Tex.' },
      { slug: 'wdtx', name: 'Western District of Texas', abbr: 'W.D. Tex.' },
    ],
  },
  {
    name: 'Sixth Circuit',
    districts: [
      { slug: 'edky', name: 'Eastern District of Kentucky', abbr: 'E.D. Ky.' },
      { slug: 'wdky', name: 'Western District of Kentucky', abbr: 'W.D. Ky.' },
      { slug: 'edmi', name: 'Eastern District of Michigan', abbr: 'E.D. Mich.' },
      { slug: 'wdmi', name: 'Western District of Michigan', abbr: 'W.D. Mich.' },
      { slug: 'ndoh', name: 'Northern District of Ohio', abbr: 'N.D. Ohio' },
      { slug: 'sdoh', name: 'Southern District of Ohio', abbr: 'S.D. Ohio' },
      { slug: 'edtn', name: 'Eastern District of Tennessee', abbr: 'E.D. Tenn.' },
      { slug: 'mdtn', name: 'Middle District of Tennessee', abbr: 'M.D. Tenn.' },
      { slug: 'wdtn', name: 'Western District of Tennessee', abbr: 'W.D. Tenn.' },
    ],
  },
  {
    name: 'Seventh Circuit',
    districts: [
      { slug: 'ndil', name: 'Northern District of Illinois', abbr: 'N.D. Ill.' },
      { slug: 'cdil', name: 'Central District of Illinois', abbr: 'C.D. Ill.' },
      { slug: 'sdil', name: 'Southern District of Illinois', abbr: 'S.D. Ill.' },
      { slug: 'ndin', name: 'Northern District of Indiana', abbr: 'N.D. Ind.' },
      { slug: 'sdin', name: 'Southern District of Indiana', abbr: 'S.D. Ind.' },
      { slug: 'edwi', name: 'Eastern District of Wisconsin', abbr: 'E.D. Wis.' },
      { slug: 'wdwi', name: 'Western District of Wisconsin', abbr: 'W.D. Wis.' },
    ],
  },
  {
    name: 'Eighth Circuit',
    districts: [
      { slug: 'edar', name: 'Eastern District of Arkansas', abbr: 'E.D. Ark.' },
      { slug: 'wdar', name: 'Western District of Arkansas', abbr: 'W.D. Ark.' },
      { slug: 'ndia', name: 'Northern District of Iowa', abbr: 'N.D. Iowa' },
      { slug: 'sdia', name: 'Southern District of Iowa', abbr: 'S.D. Iowa' },
      { slug: 'd-mn', name: 'District of Minnesota', abbr: 'D. Minn.' },
      { slug: 'edmo', name: 'Eastern District of Missouri', abbr: 'E.D. Mo.' },
      { slug: 'wdmo', name: 'Western District of Missouri', abbr: 'W.D. Mo.' },
      { slug: 'd-ne', name: 'District of Nebraska', abbr: 'D. Neb.' },
      { slug: 'd-nd', name: 'District of North Dakota', abbr: 'D.N.D.' },
      { slug: 'd-sd', name: 'District of South Dakota', abbr: 'D.S.D.' },
    ],
  },
  {
    name: 'Ninth Circuit',
    districts: [
      { slug: 'd-ak', name: 'District of Alaska', abbr: 'D. Alaska' },
      { slug: 'd-az', name: 'District of Arizona', abbr: 'D. Ariz.' },
      { slug: 'cdca', name: 'Central District of California', abbr: 'C.D. Cal.' },
      { slug: 'edca', name: 'Eastern District of California', abbr: 'E.D. Cal.' },
      { slug: 'ndca', name: 'Northern District of California', abbr: 'N.D. Cal.' },
      { slug: 'sdca', name: 'Southern District of California', abbr: 'S.D. Cal.' },
      { slug: 'd-gu', name: 'District of Guam', abbr: 'D. Guam' },
      { slug: 'd-hi', name: 'District of Hawaii', abbr: 'D. Haw.' },
      { slug: 'd-id', name: 'District of Idaho', abbr: 'D. Idaho' },
      { slug: 'd-mt', name: 'District of Montana', abbr: 'D. Mont.' },
      { slug: 'd-nv', name: 'District of Nevada', abbr: 'D. Nev.' },
      { slug: 'd-nmi', name: 'District of Northern Mariana Islands', abbr: 'D.N.M.I.' },
      { slug: 'd-or', name: 'District of Oregon', abbr: 'D. Or.' },
      { slug: 'edwa', name: 'Eastern District of Washington', abbr: 'E.D. Wash.' },
      { slug: 'wdwa', name: 'Western District of Washington', abbr: 'W.D. Wash.' },
    ],
  },
  {
    name: 'Tenth Circuit',
    districts: [
      { slug: 'd-co', name: 'District of Colorado', abbr: 'D. Colo.' },
      { slug: 'd-ks', name: 'District of Kansas', abbr: 'D. Kan.' },
      { slug: 'd-nm', name: 'District of New Mexico', abbr: 'D.N.M.' },
      { slug: 'edok', name: 'Eastern District of Oklahoma', abbr: 'E.D. Okla.' },
      { slug: 'ndok', name: 'Northern District of Oklahoma', abbr: 'N.D. Okla.' },
      { slug: 'wdok', name: 'Western District of Oklahoma', abbr: 'W.D. Okla.' },
      { slug: 'd-ut', name: 'District of Utah', abbr: 'D. Utah' },
      { slug: 'd-wy', name: 'District of Wyoming', abbr: 'D. Wyo.' },
    ],
  },
  {
    name: 'Eleventh Circuit',
    districts: [
      { slug: 'ndal', name: 'Northern District of Alabama', abbr: 'N.D. Ala.' },
      { slug: 'mdal', name: 'Middle District of Alabama', abbr: 'M.D. Ala.' },
      { slug: 'sdal', name: 'Southern District of Alabama', abbr: 'S.D. Ala.' },
      { slug: 'ndfl', name: 'Northern District of Florida', abbr: 'N.D. Fla.' },
      { slug: 'mdfl', name: 'Middle District of Florida', abbr: 'M.D. Fla.' },
      { slug: 'sdfl', name: 'Southern District of Florida', abbr: 'S.D. Fla.' },
      { slug: 'ndga', name: 'Northern District of Georgia', abbr: 'N.D. Ga.' },
      { slug: 'mdga', name: 'Middle District of Georgia', abbr: 'M.D. Ga.' },
      { slug: 'sdga', name: 'Southern District of Georgia', abbr: 'S.D. Ga.' },
    ],
  },
  {
    name: 'D.C. Circuit',
    districts: [
      { slug: 'ddc', name: 'District of Columbia', abbr: 'D.D.C.' },
    ],
  },
  {
    name: 'Federal Circuit',
    districts: [
      { slug: 'cit', name: 'Court of International Trade', abbr: 'CIT' },
    ],
  },
];

const totalDistricts = CIRCUITS.reduce((sum, c) => sum + c.districts.length, 0);

export default function DistrictsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
      <style>{`
        .district-card {
          border-color: #D5D8DC;
          transition: border-color 150ms, transform 150ms, box-shadow 150ms;
        }
        .district-card:hover {
          border-color: #E8171F;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .circuit-label {
          display: inline-flex;
          align-items: center;
          background: rgba(232,23,31,0.1);
          color: #E8171F;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 4px;
          margin-bottom: 12px;
          letter-spacing: 0.08em;
          font-family: var(--font-body);
        }
        a.lex-link { color: #006997; text-decoration: none; }
        a.lex-link:hover { text-decoration: underline; }
      `}</style>
      {/* Header */}
      {/* Breadcrumb Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #D5D8DC', padding: '16px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
            <a href="/" className="lex-link" style={{ fontWeight: 500 }}>Home</a>
            <span style={{ color: '#D5D8DC' }}>›</span>
            <span style={{ color: '#212529', fontWeight: 500 }}>Districts</span>
          </nav>
        </div>
      </div>

      <div
        className="border-b"
        style={{
          borderColor: '#D5D8DC',
          background: '#00172E',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{
              background: '#E8171F',
              color: '#FFFFFF',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            DISTRICTS
          </div>
          <h1
            className="font-black mb-6"
            style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-1.5px',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.2',
            }}
          >
            Federal Court Districts
          </h1>

          {/* Stat Counters */}
          <div className="grid grid-cols-3 gap-4 mb-6 max-w-2xl">
            <div
              className="p-4"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
              }}
            >
              <div
                className="text-2xl font-black"
                style={{ color: '#E8171F', fontFamily: 'var(--font-display)' }}
              >
                94
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}
              >
                Federal Districts
              </div>
            </div>
            <div
              className="p-4"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
              }}
            >
              <div
                className="text-2xl font-black"
                style={{ color: '#E8171F', fontFamily: 'var(--font-display)' }}
              >
                {CIRCUITS.length}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}
              >
                Circuits
              </div>
            </div>
            <div
              className="p-4"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
              }}
            >
              <div
                className="text-2xl font-black"
                style={{ color: '#E8171F', fontFamily: 'var(--font-display)' }}
              >
                50
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}
              >
                States
              </div>
            </div>
          </div>

          <p
            className="leading-relaxed max-w-2xl"
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
              lineHeight: '1.6',
            }}
          >
            All {totalDistricts} federal judicial districts across {CIRCUITS.length} circuits.
            Each district has its own judges, caseload, and outcome patterns. Explore outcomes
            by district to understand regional variations in case results.
          </p>
        </div>
      </div>

      {/* Circuits */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {CIRCUITS.map((circuit) => (
            <section key={circuit.name}>
              <div style={{ marginBottom: '16px' }}>
                <div className="circuit-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Circuit {circuit.name.split(' ').pop()}
                </div>
              </div>
              <h2
                className="font-bold mb-6"
                style={{
                  color: '#212529',
                  fontFamily: 'var(--font-display)',
                  borderBottom: '2px solid #E8171F',
                  paddingBottom: '8px',
                  display: 'inline-block',
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                }}
              >
                {circuit.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {circuit.districts.map((d) => (
                  <a
                    key={d.slug}
                    href={`/districts/${d.slug}`}
                    className="district-card group p-4 border"
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '4px',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold" style={{ color: '#212529', fontFamily: 'var(--font-body)' }}>
                          {d.name}
                        </h3>
                        <p className="text-[11px] mt-1" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                          {d.abbr}
                        </p>
                      </div>
                      <ArrowRightIcon size={16} color="#E8171F" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
