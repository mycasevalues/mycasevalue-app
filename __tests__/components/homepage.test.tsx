import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}))

vi.mock('next/link', () => {
  return {
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    ),
  }
})

describe('HomePage', () => {
  it('renders the main heading', async () => {
    const HomePage = (await import('../../app/page')).default

    const { container } = render(<HomePage />)

    // Check for the main headline. The hero headline is the gold `<span>`
    // "Open to Everyone." — but the <TrustSection> paragraph also contains
    // the phrase "open to everyone" (lowercase). Use getAllByText and assert
    // the hero-styled span is among the matches.
    expect(screen.getByText(/The Federal Court Record/i)).toBeInTheDocument()
    const openToEveryoneMatches = screen.getAllByText(/Open to Everyone/i)
    expect(openToEveryoneMatches.length).toBeGreaterThanOrEqual(1)
    // The hero match is the <span> with the gold color token
    const heroMatch = openToEveryoneMatches.find(
      (el) => el.tagName === 'SPAN' && /gold|C4882A/.test(el.getAttribute('style') || '')
    )
    expect(heroMatch).toBeDefined()
  })

  it('renders the search input', async () => {
    const HomePage = (await import('../../app/page')).default

    render(<HomePage />)

    const searchInput = screen.getByPlaceholderText(/Search cases, judges, districts/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('renders the search button in hero section', async () => {
    const HomePage = (await import('../../app/page')).default

    const { container } = render(<HomePage />)

    // Get all search buttons and verify at least one exists in hero
    const buttons = screen.getAllByRole('button', { name: /Search/i })
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders browse cards section', async () => {
    const HomePage = (await import('../../app/page')).default

    render(<HomePage />)

    // Verify browse cards are rendered
    const cards = screen.getAllByText(/Federal Districts/i)
    expect(cards.length).toBeGreaterThan(0)

    expect(screen.getByText(/Case Analytics/i)).toBeInTheDocument()
  })

  it('displays platform statistics section', async () => {
    const HomePage = (await import('../../app/page')).default

    render(<HomePage />)

    expect(screen.getByText(/Total Cases Indexed/i)).toBeInTheDocument()
    expect(screen.getByText(/PLATFORM STATISTICS/i)).toBeInTheDocument()
  })

  it('renders navigation links', async () => {
    const HomePage = (await import('../../app/page')).default

    render(<HomePage />)

    expect(screen.getByText('Advanced search')).toBeInTheDocument()
    expect(screen.getByText('Search tips')).toBeInTheDocument()
  })

  it('has accessible search functionality', async () => {
    const HomePage = (await import('../../app/page')).default

    render(<HomePage />)

    const searchInput = screen.getByPlaceholderText(/Search cases, judges, districts/i)
    expect(searchInput).toHaveAttribute('aria-label')
  })
})
