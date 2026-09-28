import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "One or two sentences — shown on project cards.",
    }),
    defineField({
      name: "longDescription",
      title: "Case study",
      type: "array",
      of: [{ type: "block" }, { type: "codeBlock" }],
      description:
        "Full case study. Use H2 headings for 'The Problem', 'Your Role', 'Approach / Process' and 'Results / Outcome' — the case study page renders each H2 as a gradient section heading.",
    }),
    defineField({
      name: "techStack",
      title: "Tech stack",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown as badges, e.g. Python, LangChain, FastAPI.",
    }),
    defineField({
      name: "role",
      title: "Your role",
      type: "string",
      description: "e.g. 'Solo builder — design, build, deploy'.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "In progress", value: "in-progress" },
          { title: "Coming soon", value: "coming-soon" },
        ],
      },
      initialValue: "in-progress",
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      description: "Optional — shown as a 'Visit live site' button.",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      description: "Optional — shown as a 'View code' button.",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Recommended 16:9, 1600px wide, .webp.",
    }),
    defineField({
      name: "featured",
      title: "Featured on home page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],
});
