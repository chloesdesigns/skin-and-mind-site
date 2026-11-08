# The Skin and Mind Project

A website your client edits herself, with no code.

- **Start here:** `SETUP.md` — one-time setup, about 30 minutes, free
- **Give her:** `HOW-TO-EDIT.md` — how she writes posts
- **Read before launch:** `LEGAL-CHECKLIST.md`

## How it works

Content lives as files in this repo. Eleventy turns them into a static site.
Decap CMS gives a login at `/admin` so content can be edited without touching code.
Netlify rebuilds and publishes on every change.

## Folders

```
src/
  _data/        site settings and page text (editable in the CMS)
  _includes/    page layouts
  assets/       the stylesheet
  admin/        the CMS
  posts/        blog posts
  articles/     Skin + Mind articles
  interviews/   interviews
  spotlights/   research spotlights
  library/      research library sources
  uploads/      images added through the CMS
  *.njk         the main pages
```

## Running it locally

```
npm install
npm start
```

Then open http://localhost:8080
