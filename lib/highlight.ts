/**
 * Tiny dependency-free syntax highlighter for the codeBlock portable-text
 * type (spec 2.3: "code blocks: dark background + Fira Code + syntax
 * highlight colors"). Tokenizes comments, strings, numbers and keywords —
 * pure string processing, renders as React spans (no dangerouslySetInnerHTML).
 */

export type TokenColor = "comment" | "string" | "number" | "keyword" | "plain";

export interface CodeToken {
  text: string;
  color: TokenColor;
}

const JS_KEYWORDS = [
  "async", "await", "break", "case", "catch", "class", "const", "continue",
  "default", "delete", "do", "else", "export", "extends", "finally", "for",
  "function", "if", "import", "in", "instanceof", "let", "new", "return",
  "super", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "yield",
];

const KEYWORDS: Record<string, string[]> = {
  python: [
    "False", "None", "True", "and", "as", "assert", "async", "await", "break",
    "case", "class", "continue", "def", "del", "elif", "else", "except", "finally",
    "for", "from", "global", "if", "import", "in", "is", "lambda", "match",
    "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
  ],
  javascript: JS_KEYWORDS,
  typescript: [
    ...JS_KEYWORDS,
    "as", "declare", "enum", "implements", "interface", "keyof", "namespace",
    "private", "protected", "public", "readonly", "satisfies", "type",
  ],
  bash: [
    "case", "do", "done", "elif", "else", "esac", "exit", "export", "fi",
    "for", "function", "if", "in", "local", "return", "set", "then", "while",
  ],
  json: ["false", "null", "true"],
  sql: [
    "AND", "AS", "BY", "CREATE", "DELETE", "DISTINCT", "FROM", "GROUP", "HAVING",
    "INSERT", "INTO", "JOIN", "LIMIT", "NOT", "NULL", "ON", "ORDER", "OR",
    "SELECT", "SET", "TABLE", "UPDATE", "VALUES", "WHERE",
  ],
  text: [],
};

function commentPattern(language: string): string {
  switch (language) {
    case "python":
    case "bash":
      return "#.*$";
    case "javascript":
    case "typescript":
      return "\\/\\/.*$";
    case "sql":
      return "--.*$";
    default:
      return "(?!)"; // never matches
  }
}

/**
 * Tokenize source code. Group order (stable across languages):
 * 1 = comment, 2 = string, 3 = number, 4 = keyword.
 */
export function highlightCode(code: string, language?: string): CodeToken[] {
  const lang = (language ?? "text").toLowerCase();
  const keywords = KEYWORDS[lang] ?? KEYWORDS.text;

  const source = [
    `(${commentPattern(lang)})`,
    `("(?:[^"\\\\\n]|\\\\.)*"|'(?:[^'\\\\\n]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)`,
    `(\\b\\d+(?:\\.\\d+)?\\b)`,
    keywords.length ? `(\\b(?:${keywords.join("|")})\\b)` : `(?!)`,
  ].join("|");

  const regex = new RegExp(source, "gm");
  const tokens: CodeToken[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > last) {
      tokens.push({ text: code.slice(last, match.index), color: "plain" });
    }
    const color: TokenColor = match[1]
      ? "comment"
      : match[2]
        ? "string"
        : match[3]
          ? "number"
          : "keyword";
    tokens.push({ text: match[0], color });
    last = match.index + match[0].length;
    if (match[0].length === 0) regex.lastIndex += 1;
  }
  if (last < code.length) {
    tokens.push({ text: code.slice(last), color: "plain" });
  }
  return tokens;
}
