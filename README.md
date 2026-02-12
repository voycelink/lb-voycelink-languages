# @voycelink/languages

Shared language definitions and validation utilities for all Voycelink platforms.

## Installation

```bash
npm install @voycelink/languages
```

## Usage

```typescript
import {
  languages,
  isLanguageCode,
  getLanguage,
  getVisibleLanguages,
  getOfferableLanguages,
  assertLanguageCode,
} from '@voycelink/languages';

// Validate a language code
isLanguageCode('spa'); // true
isLanguageCode('xyz'); // false

// Assert (throws if invalid)
assertLanguageCode(userInput); // throws Error if not a valid code

// Get a specific language
const spanish = getLanguage('spa');
// { code: 'spa', nameRef: 'Spanish', nameDisplay: 'Spanish', isOfferable: true, isVisible: true }

// Get all visible languages (for UI selectors)
const visible = getVisibleLanguages(); // 140 languages

// Get all offerable languages (available for interpretation)
const offerable = getOfferableLanguages();

// Full catalog (7927 ISO 639-3 entries)
console.log(languages.length);
```

## API

| Export                  | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `languages`             | Full readonly array of all 7927 `Language` entries            |
| `isLanguageCode(value)` | Type guard — returns `true` if value is a valid language code |
| `assertLanguageCode(v)` | Assertion — throws if value is not a valid language code      |
| `getLanguage(code)`     | Returns the `Language` object for a code, or `undefined`      |
| `isOfferable(code)`     | `true` if the language is offerable for services              |
| `isVisible(code)`       | `true` if the language is visible in UI selectors             |
| `getVisibleLanguages()` | Returns only visible languages                                |
| `getOfferableLanguages()` | Returns only offerable languages                            |

## Types

```typescript
interface Language {
  code: string;        // ISO 639-3 three-letter code
  nameRef: string;     // Canonical / ISO reference name
  nameDisplay: string; // Display name (may include commercial overrides)
  isOfferable: boolean;
  isVisible: boolean;
}
```

## Regenerating language data

If the SQL seed changes, regenerate the data file:

```bash
npm run generate -- <path-to-002_language_seed.sql>
```

If no path is provided, it defaults to `../callcenter/ms-voycelink-callcenter/prisma/002_language_seed.sql`.
