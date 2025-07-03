
# Guide: Building Your Independent Media Database

This document outlines the professional architecture for creating a robust, independent media database for the Sanatana Peethams Portal. The goal is to source images from public pages (like Facebook), store them securely under your control, and display them beautifully on the website.

This process transforms your portal from being dependent on external platforms to being a self-reliant, authoritative archive.

---

## The Architecture: The Four-Step Process

Building a proper media pipeline involves four key steps. This is a backend process that you would run separately from the website itself.

### Step 1: Scraping from the Source (e.g., Facebook)

This is the process of programmatically gathering data from a website.

*   **Tool:** The industry-standard tool for this is **Puppeteer**, a library that allows you to control a web browser with code. You would write a script (e.g., in Node.js) to do this.
*   **Process:**
    1.  The script launches a browser.
    2.  It navigates to a Peetham's Facebook page.
    3.  It scrolls down to load historical posts and images.
    4.  For each image, it extracts the image URL, the post text (for the description), and the date.
*   **Important Note:** This can be complex. It requires handling logins and may need to be updated if Facebook changes its website structure.

### Step 2: Storing Your Media (Firebase Cloud Storage)

Once you have the image URLs, you need to download them and save them in your own system. The best place for this is **Firebase Cloud Storage**.

*   **Process:** Your scraper script would download each image and then upload it to a designated bucket in your Firebase Cloud Storage.
*   **Benefit:** The images are now yours. They are stored securely, and you are not dependent on the original source link remaining active.

### Step 3: Organizing Your Metadata (Firestore)

An image file is useless without its context. **Firestore** is the perfect database for this.

*   **Process:** For each image you save to Cloud Storage, your scraper script would create a new document in a Firestore collection (e.g., `media`). This document would store the "metadata":
    *   `title`: The title of the image or event.
    *   `description`: The text from the original post.
    *   `date`: The date of the event.
    *   `peetham`: The Peetham it belongs to (e.g., 'Sringeri').
    *   `imageUrl`: The new URL of the image in your own Firebase Cloud Storage.
    *   `sourceUrl`: The original Facebook post URL, for reference.
*   **Benefit:** This creates a structured, searchable database of all your media content.

### Step 4: Backing Up Your Assets (Google Drive)

You have the `storage-googledrive-export` extension installed. This provides an excellent, automated backup solution.

*   **Process:** Once an image is uploaded to Firebase Cloud Storage (in Step 2), this extension can automatically copy it to a folder in your Google Drive.
*   **Benefit:** This gives you an extra layer of security and a human-readable archive of all your media assets, completely independent of the application.

---

## How This Portal Displays the Data

The new **Gallery** page and the redesigned Peetham pages are built to read data directly from a structure like the one described above. They fetch the list of media from your database (currently simulated in the `/lib/*-media.ts` files) and display it chronologically.

By following the pipeline above, you can build a powerful, automated system to keep your portal's content rich, fresh, and historically deep for years to come.
