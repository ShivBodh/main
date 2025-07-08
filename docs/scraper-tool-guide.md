# Guide: The Content Processor Tool

This document explains the architecture and use of the Content Processor, a powerful tool for curating and enhancing content for the Sanatana Peethams Portal.

**Important Clarification:** This tool is **not** a live, automated web scraper. It does not connect to social media sites. Instead, it provides a robust, manual pipeline to process content that you have gathered, ensuring high quality and relevance for your portal. For information on how the website *displays* this data, see `docs/data-pipeline-guide.md`.

---

## The Manual Curation Workflow

This professional workflow gives you complete control over the content that appears on your site. It involves three simple steps.

### Step 1: Find Your Source Content

Your role is that of a digital curator. Browse the official social media pages (Facebook, Instagram, X) or websites of the four Peethams. When you find a post with a high-quality image and meaningful description you want to feature, you have your source.

*   **Action:**
    1.  Copy the post's description text.
    2.  Right-click the image and copy its direct URL (e.g., "Copy Image Address").

### Step 2: Add Content to the Source File

This is where you tell the tool what content to process.

*   **File:** `src/lib/scraping-source-data.ts`
*   **Action:**
    1.  Open this file in your editor.
    2.  Add a new object to the `scrapingSourceData` array.
    3.  Paste the description and image URL into the appropriate fields.
    4.  Fill in the `date`, `peetham`, and a one or two-word `aiHint` for the image.

### Step 3: Run the Processor

This final step uses AI to enhance your content and saves it to the database.

*   **Command:** In your terminal, run `npm run scrape`.
*   **Process:**
    1.  **Wipe & Replace:** The script first **deletes all old media** from your Firestore database, ensuring a clean slate.
    2.  **AI Enhancement:** For each item you added, the script sends the description to an AI model to generate a concise, engaging title and relevant keywords.
    3.  **Thumbnail Generation:** It creates an optimized thumbnail URL for fast loading on the website.
    4.  **Database Storage:** The script saves the final, structured object (original description, image URL, thumbnail URL, AI-generated title, etc.) to your `media` collection in Firestore.

This semi-automated process combines the best of human curation with the power of AI, resulting in a high-quality, authentic, and performant digital portal.
