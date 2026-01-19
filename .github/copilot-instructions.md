<!--
Guidance for AI coding agents (concise, actionable)
This file is tuned for Copilot-like agents to be immediately productive in this repo.
-->
# Copilot / AI Agent Instructions

- **Project purpose:** Accessible, SEO-friendly Astro starter with Tailwind + SCSS, MDX content collections, and a11y-first components. See [README.md](README.md) for high-level details.
- **Run & Build commands:**
  - `npm install`, `npm run dev`, `npm run build`, `npm run preview` (defined in package.json)

- **Important files & where to start:**
  - Config: [astro.config.mjs](astro.config.mjs#L1) (i18n, Vite aliases, MDX, sitemap)
  - Content collections: [src/content.config.ts](src/content.config.ts#L1) (defines `articles` and `projects` with required schema)
  - Page layouts: [src/layouts/DefaultLayout.astro](src/layouts/DefaultLayout.astro#L1) and [src/layouts/MarkdownLayout.astro](src/layouts/MarkdownLayout.astro#L1)
  - Example MDX content: [src/content/articles/article-01.mdx](src/content/articles/article-01.mdx#L1)
  - Dynamic routes: blog pagination at [src/pages/blog/[...page].astro](src/pages/blog/[...page].astro#L1), project pages at [src/pages/portfolio/[project].astro](src/pages/portfolio/[project].astro#L1)
  - Utilities: [src/utils/slugify.ts](src/utils/slugify.ts#L1)

- **Architecture & patterns (high-level):**
  - Content-driven site using Astro Content Collections (`getCollection`, `render`) for articles and projects.
  - Paths/Aliases configured in `astro.config.mjs` and `tsconfig.json` (e.g., `@components`, `@assets`, `@/utils`). Use these aliases when importing.
  - Styling: Tailwind (src/styles/tailwind.css) + SCSS partials in `src/assets/scss/`. Keep global styles in `DefaultLayout.astro` imports.
  - Components: Reuse `accessible-astro-components` package for shared UI patterns; components are used across pages and layouts.

- **Content rules & schema (explicit):**
  - `articles` collection (src/content/articles) requires: `title`, `author`, `description`, `tags` (string[]), `pubDate` (Date), `coverImage` (string).
  - `projects` collection (src/content/projects) requires: `title`, `author`, `description`, `tags` (string[]).
  - Optional `slug` frontmatter is supported for `articles` and `projects` to override auto-generated slugs.
  - Add new article/project by adding `.mdx` under the corresponding folder with correct frontmatter schema. Example frontmatter for an article:
    ```md
    ---
    title: My Article
    author: Jane Doe
    description: Short summary
    tags: ["tag1","tag2"]
    pubDate: 2025-10-01
    coverImage: article-sample.webp
    ---
    ```

- **How dynamic pages are generated:**
  - Use `getStaticPaths` and `getCollection` (examples in blog and portfolio pages). MDX content is rendered with `render` to supply `Content` component.
  - Slugs are generated from article or project titles using `slugify` and used in URLs (e.g., `/blog/{slug}`, `/portfolio/{slug}`); `slugify` is still used for tag slugs.
    - Note: slugs are derived from the `title` and must be unique across articles and projects. If duplicate titles are possible, consider adding a `slug` frontmatter field or appending a uniqueness suffix when generating slugs.

- **Asset handling:**
  - Images may be placed in `public/posts` or `public/projects` (aliases: `@post-images`, `@project-images`) or in `src/assets/images/` and imported for optimization.
  - When possible import static images for `astro:assets` optimization (see blog list importing `@assets/images` in [src/pages/blog/[...page].astro](src/pages/blog/[...page].astro#L1)).

- **Security & accessibility patterns to maintain:**
  - `sanitize-html` is used in `PageHeader.astro` to clean subtitle HTML—always sanitize untrusted or user-provided HTML.
  - Prefer `accessible-astro-components` rather than rolling custom accessible components.
  - Follow `eslint-plugin-jsx-a11y` rules; avoid introducing a11y regressions.

- **Conventions & small gotchas:**
  - Locale support: `astro.config.mjs` sets `locales: ["es","en"]`, default `en`. Place translated pages under `src/pages/es/`.
  - SCSS partials are under `src/assets/scss/base` and `index.scss` imports them; use SCSS for project-specific variables and Tailwind for utilities.
  - `DefaultLayout.astro` uses `ClientRouter` and view transitions—do not remove unless intentionally changing page transitions.
  - `tsconfig.json` maps `@/utils/*` to `src/utils/*`; watch out for alias differences between `@` and `@assets`.

- **Linting / formatting:**
  - This project uses Prettier and ESLint (see `eslint.config.js`). There is no `lint` npm script, so run `npx eslint . --ext .ts,.astro,.js` and `npx prettier --write .` manually when needed.

- **When editing code / adding features:**
  - Add or update components under `src/components/` and re-use `accessible-astro-components` where possible.
  - Add tests (if introducing logic) and use type-safe `astro:content` APIs for content access.
  - Use `slugify` helper for custom tag slugs and adhere to existing collection schemas.

- **Example quick tasks for a new contributor:**
  - Add a blog post: create `src/content/articles/my-new-article.mdx`, add frontmatter to match `articles` schema, include images under `public/posts/` or `src/assets/images`.
  - Add a translated page: create `src/pages/es/{page}.astro` and set localized content.

If any part of the repo structure or build steps are unclear, ask for a clarification and include a small proposed code change and tests to demonstrate intent.
