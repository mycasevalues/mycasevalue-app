import glossaryData from '../data/glossary.json';

export interface GlossaryTerm {
  slug: string;
  term: string;
  pronunciation: string | null;
  definition: string;
  federalContext: string;
  dataContext: string;
  relatedTerms: string[];
  relatedNosCodes: string[];
  source: string;
  featured: boolean;
}

/**
 * Load all glossary terms from JSON
 */
export function getAllTerms(): GlossaryTerm[] {
  return glossaryData as GlossaryTerm[];
}

/**
 * Get a single term by slug
 */
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  const terms = getAllTerms();
  return terms.find((term) => term.slug === slug);
}

/**
 * Get all terms that start with a specific letter
 */
export function getTermsByLetter(letter: string): GlossaryTerm[] {
  const terms = getAllTerms();
  const upperLetter = letter.toUpperCase();
  return terms.filter((term) => term.term.charAt(0).toUpperCase() === upperLetter);
}

/**
 * Get all featured terms
 */
export function getFeaturedTerms(): GlossaryTerm[] {
  const terms = getAllTerms();
  return terms.filter((term) => term.featured === true);
}

/**
 * Search terms by query string (searches term, definition, and related contexts)
 */
export function searchTerms(query: string): GlossaryTerm[] {
  const terms = getAllTerms();
  const lowerQuery = query.toLowerCase();

  return terms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      term.federalContext.toLowerCase().includes(lowerQuery) ||
      term.dataContext.toLowerCase().includes(lowerQuery)
  );
}
