# SideNote: Lightweight Side Commenting Tool for the Web

## Overview

**SideNote** is a lightweight, embeddable JavaScript tool that allows readers to add **inline comments** on the side of any static webpage or document content. The intended use is for use within rapidly changing online books so that readers can contribute notes to the book as it is written.

**SideNote** built with **plain DOM APIs in TypeScript**, no frontend frameworks, and is designed for **maximum portability and ease of use** — usable in blogs, documentation, learning platforms, or personal sites.

This was started as a **2-day student project** with core goals and optional stretch goals. The focus is on **clear structure, working MVP, and JavaScript/TypeScript best practices**. However, my hope is that this becomes a useful open source project that I will also use with my own online books.

---

## Core Goals (MVP)

> Complete these during the 2-day project.

### 1. Text Selection + Comment Anchoring
- Allow user to select a paragraph or element.
- Use `querySelector` or a unique ID to track the anchor.
- Highlight the selected section or paragraph on hover.

### 2. Sidebar Comment UI
- A fixed sidebar next to the document.
- When user clicks a paragraph, sidebar opens a comment form.
- Saved comments appear next to the anchored section.

### 3. Basic Backend with Express
- Node.js + Express server with endpoints:
  - `GET /comments`
  - `POST /comments`
- Use an in-memory store or a JSON file for simplicity.
- Comments contain: `id`, `selector`, `text`, `timestamp`.

### 4. Embeddable Script
- Single JS file compiled from TypeScript that:
  - Attaches SideNote to any page with `sidenote.init()` or similar.
  - Adds event listeners and sidebar UI.
  - Works without a framework like React/Vue/Angular.

---

## Stretch Goals (Optional)

> Do as many of these as time permits.

- [ ] Highlighting: Visually highlight annotated sections.
- [ ] Edit/Delete Comments
- [ ] Add persistent storage (ideally with the Manager Design Pattern so that different backends can be used as needed)
- [ ] Multiple pages support (use `pageId` or `window.location.pathname`)
- [ ] Hover preview of comments on the paragraph itself
- [ ] Markdown formatting in comment body
- [ ] Theming support with a CSS config file
- [ ] Embed loader script (e.g. `<script src="sidenote.js"></script>`)
- [ ] Hash deep-linking to a specific comment
- [ ] Create module in React that uses this library
- [ ] Add to Vite bundler

---

## Tech Stack

- **Frontend**: TypeScript (compiled to JS), HTML, CSS
- **Backend**: Node.js, Express
- **Storage**: JSON file (or in-memory for demo)(Expandable with Stretch goals)
- **No frontend frameworks required** (Future projects can add to front-end frameworks) 
- **No bundlers (Vite, ESBuild)** (Future projects can emed within Vite)

---

## Usage Example

On any HTML page:

```html
<script src="/sidenote.js"></script>
<script>
  sidenote.init({
    endpoint: 'http://localhost:3000/comments',
    contentSelector: '#main-content'
  });
</script>
```

---

## Philosophy

- **Keep it tiny**: Small enough to read and understand in one sitting.
- **No framework lock-in**: Plays well with static sites, React, or anything else.
- **Empower learners**: Show the power of DOM, selectors, and simple APIs.
- **Fun to build**: Use it as a starter for more advanced projects later.


## TODO

```
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationDir": "dist",
    "emitDeclarationOnly": false,
    ...
  }
}
```