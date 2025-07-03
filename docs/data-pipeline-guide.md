# Guide: Previewing Your Media Content

This document explains how the Sanatana Peethams Portal is designed to preview and display the rich media content that you manage in your independent Firebase database.

While the **Scraper Tool Guide** (`docs/scraper-tool-guide.md`) details the backend process of *gathering* your content, this guide focuses on how the website *uses* that content to create a beautiful and responsive user experience.

---

## The Preview Architecture

The portal uses a "preview-first" approach. The website code is built to read from a specific data structure in your Firestore database. It assumes that you have already populated this database with the necessary information (titles, descriptions, image URLs, etc.).

This separation of concerns is a professional best practice:

*   **The Website (The "Previewer"):** Its only job is to display content beautifully. It doesn't know or care how the content got into the database. This makes the website fast, secure, and easier to maintain.
*   **The Scraper (The "Populator"):** This is your separate, backend tool responsible for finding, fetching, and organizing content into the database. See the `scraper-tool-guide.md` for more details.

### How the Galleries Work

1.  **Data Fetching:** When you visit a page like the main "Gallery" or a specific Peetham's media tab, the website code queries your media data source.
2.  **Chronological Display:** The code is designed to automatically sort all fetched items by date, ensuring that the most recent content always appears first.
3.  **Thumbnail Optimization:** The `PhotoCard` component is built to use the `thumbnailUrl` provided in your database. This ensures that the gallery pages load almost instantly by displaying small, fast-loading thumbnails.
4.  **Full-Size Image on Demand:** When a user clicks on a thumbnail, the website then loads and displays the full-resolution `imageUrl`, providing the best of both worlds: speed and quality.

---

## Current Status: Using Simulated Data

Currently, the portal is using **simulated data** located in the `/lib/*-media.ts` files. This data is structured exactly as the website expects it to be in your Firestore database.

This allows us to build and perfect the entire user interface and previewing experience *before* your backend database is fully populated. Once you run your scraper and have live data in Firestore, we can switch the website to read from Firestore with a simple change.
