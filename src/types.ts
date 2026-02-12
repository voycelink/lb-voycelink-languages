export interface Language {
  /** ISO 639-3 three-letter code */
  code: string;
  /** Reference name (canonical / ISO name) */
  nameRef: string;
  /** Display name (may include commercial overrides) */
  nameDisplay: string;
  /** Whether the language can be offered for interpretation services */
  isOfferable: boolean;
  /** Whether the language is visible in UI selectors */
  isVisible: boolean;
}
