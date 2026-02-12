/**
 * Generates src/languages.ts from the Prisma SQL seed file.
 *
 * Usage:
 *   ts-node scripts/generate-from-sql.ts <path-to-002_language_seed.sql>
 */

import * as fs from 'fs';
import * as path from 'path';

const sqlPath =
  process.argv[2] ??
  path.resolve(
    __dirname,
    '../../callcenter/ms-voycelink-callcenter/prisma/002_language_seed.sql',
  );

const sql = fs.readFileSync(sqlPath, 'utf-8');

// Match: ('code', 'nameRef', 'nameDisplay', true/false, true/false)
// Handle escaped single quotes inside values (e.g. Abu'' Arapesh)
const rowRegex =
  /\('([a-z]{3})',\s*'((?:[^']|'')*)',\s*'((?:[^']|'')*)',\s*(true|false),\s*(true|false)\)/g;

interface RawLanguage {
  code: string;
  nameRef: string;
  nameDisplay: string;
  isOfferable: boolean;
  isVisible: boolean;
}

const languages: RawLanguage[] = [];
let match: RegExpExecArray | null;

while ((match = rowRegex.exec(sql)) !== null) {
  languages.push({
    code: match[1],
    nameRef: match[2].replace(/''/g, "'"),
    nameDisplay: match[3].replace(/''/g, "'"),
    isOfferable: match[4] === 'true',
    isVisible: match[5] === 'true',
  });
}

console.log(`Parsed ${languages.length} languages from SQL seed.`);

// ── Generate src/languages.ts ──────────────────────────────────────────

const escStr = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const lines = languages.map(
  (l) =>
    `  { code: '${l.code}', nameRef: '${escStr(l.nameRef)}', nameDisplay: '${escStr(l.nameDisplay)}', isOfferable: ${l.isOfferable}, isVisible: ${l.isVisible} },`,
);

const fileContent = `// AUTO-GENERATED — do not edit manually.
// Re-generate with: npm run generate
import { Language } from './types';

export const languages: readonly Language[] = [
${lines.join('\n')}
] as const;
`;

const outPath = path.resolve(__dirname, '../src/languages.ts');
fs.writeFileSync(outPath, fileContent, 'utf-8');
console.log(`Written ${languages.length} entries to ${outPath}`);
