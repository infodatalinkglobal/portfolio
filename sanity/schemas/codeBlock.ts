import { defineField, defineType } from "sanity";

/**
 * Custom portable-text object: a fenced code block with a language tag.
 * Rendered with Fira Code on a dark background (Part 2.3 / 2.5).
 */
export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "Python", value: "python" },
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "Bash", value: "bash" },
          { title: "JSON", value: "json" },
          { title: "SQL", value: "sql" },
          { title: "Plain text", value: "text" },
        ],
        layout: "radio",
      },
      initialValue: "python",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 10,
    }),
  ],
});
