import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock Next.js navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: vi.fn(),
  }),
}))

// Import component
import { SearchHero } from '../../components/SearchHero'

describe('SearchHero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the search input field', () => {
    render(<SearchHero />)

    const input = screen.getByPlaceholderText(/Search cases, judges, districts/i)
    expect(input).toBeInTheDocument()
  })

  it('renders the search button', () => {
    render(<SearchHero />)

    const button = screen.getByRole('button', { name: /SEARCH/i })
    expect(button).toBeInTheDocument()
  })

  it('renders example search pills', () => {
    render(<SearchHero />)

    expect(screen.getByText('Securities fraud')).toBeInTheDocument()
    expect(screen.getByText('Employment discrimination')).toBeInTheDocument()
    expect(screen.getByText('Patent infringement')).toBeInTheDocument()
  })

  it('updates input value on change', async () => {
    const user = userEvent.setup()
    render(<SearchHero />)

    const input = screen.getByPlaceholderText(/Search cases, judges, districts/i) as HTMLInputElement
    await user.type(input, 'employment discrimination')

    expect(input.value).toBe('employment discrimination')
  })

  it('navigates on form submit with query', async () => {
    const user = userEvent.setup()
    render(<SearchHero />)

    const input = screen.getByPlaceholderText(/Search cases, judges, districts/i)
    const button = screen.getByRole('button', { name: /SEARCH/i })

    await user.type(input, 'patent cases')
    await user.click(button)

    expect(mockPush).toHaveBeenCalledWith('/case-search?q=patent%20cases')
  })

  it('navigates to case-search on empty submit', async () => {
    const user = userEvent.setup()
    render(<SearchHero />)

    const button = screen.getByRole('button', { name: /SEARCH/i })
    await user.click(button)

    expect(mockPush).toHaveBeenCalledWith('/case-search')
  })

  it('navigates when example pill is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchHero />)

    const pill = screen.getByText('Securities fraud')
    await user.click(pill)

    expect(mockPush).toHaveBeenCalledWith('/case-search?q=Securities%20fraud')
  })

  it('renders with light variant by default', () => {
    const { container } = render(<SearchHero />)

    const formWrapper = container.querySelector('[role="search"]')?.parentElement
    expect(formWrapper).toBeInTheDocument()
  })

  it('renders with dark variant', () => {
    const { container } = render(<SearchHero variant="dark" />)

    const formWrapper = container.querySelector('[role="search"]')?.parentElement
    expect(formWrapper).toBeInTheDocument()
  })

  it('has proper search role for accessibility', () => {
    render(<SearchHero />)

    const searchForm = screen.getByRole('search')
    expect(searchForm).toBeInTheDocument()
  })

  it('disables whitespace-only queries', async () => {
    const user = userEvent.setup()
    render(<SearchHero />)

    const input = screen.getByPlaceholderText(/Search cases, judges, districts/i)
    const button = screen.getByRole('button', { name: /SEARCH/i })

    await user.type(input, '   ')
    await user.click(button)

    expect(mockPush).toHaveBeenCalledWith('/case-search')
  })
})
