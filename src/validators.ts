import { languages } from './languages';
import { Language } from './types';

/** Set of all valid ISO 639-3 language codes for O(1) lookup */
const validCodes: ReadonlySet<string> = new Set(
  languages.map((l) => l.code),
);

/** Map from code to Language for fast retrieval */
const languageByCode: ReadonlyMap<string, Language> = new Map(
  languages.map((l) => [l.code, l]),
);

/**
 * Returns true if the given value is a valid ISO 639-3 language code
 * present in the Voycelink language catalog.
 */
export function isLanguageCode(value: unknown): value is string {
  return typeof value === 'string' && validCodes.has(value);
}

/**
 * Returns the Language object for a given code, or undefined if not found.
 */
export function getLanguage(code: string): Language | undefined {
  return languageByCode.get(code);
}

/**
 * Returns true if the language identified by the given code is offerable
 * (available for interpretation services).
 */
export function isOfferable(code: string): boolean {
  const lang = languageByCode.get(code);
  return lang?.isOfferable ?? false;
}

/**
 * Returns true if the language identified by the given code is visible
 * in UI selectors.
 */
export function isVisible(code: string): boolean {
  const lang = languageByCode.get(code);
  return lang?.isVisible ?? false;
}

/**
 * Returns the subset of languages that are visible (is_visible = true).
 */
export function getVisibleLanguages(): readonly Language[] {
  return languages.filter((l) => l.isVisible);
}

/**
 * Returns the subset of languages that are offerable (is_offerable = true).
 */
export function getOfferableLanguages(): readonly Language[] {
  return languages.filter((l) => l.isOfferable);
}

/**
 * Asserts that the given value is a valid language code.
 * Throws an error if the value is not a valid code.
 */
export function assertLanguageCode(value: unknown): asserts value is string {
  if (!isLanguageCode(value)) {
    throw new Error(
      `Invalid language code: ${String(value)}. Expected a valid ISO 639-3 code.`,
    );
  }
}
