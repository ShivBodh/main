
/**
 * @fileoverview A more robust Scraper Tool for the Sanatana Peethams Portal.
 *
 * This script uses Puppeteer to scrape a target page and leverages a Genkit AI
 * flow to process the scraped text into titles and keywords. It now saves
 * the output to a structured JSON file, creating a local database.
 *
 * =============================================================================
 *  IMPORTANT: How to Use This AI-Powered Scraper
 * =============================================================================
 * This tool now works in conjunction with a local Genkit AI server.
 *
 * 1.  **Start the Genkit AI Server:**
 *     In a separate terminal, run the following command to start the Genkit
 *     development server. This server exposes the AI flow that processes text.
 *     `npm run genkit:watch`
 *
 * 2.  **Configure Scraper Settings:**
 *     Update the `CONFIG` object below with your target URL.
 *     **Crucially, you must open the `.env` file in the project's root
 *     directory and replace the placeholder Facebook credentials with your own.**
 *
 * 3.  **Run the Scraper:**
 *     Once the Genkit server is running, open a new terminal and execute this
 *     script:
 *     `node scripts/run-scraper.js`
 *
 * 4.  **Check the Output:**
 *     - Images will be saved locally to the `SAVE_DIR`.
 *     - The AI-processed metadata will be saved as a database in `OUTPUT_FILE`.
 *     - **The scraped images will automatically appear on the Bodha Calendar page.**
 *
 * For a full architectural overview, please see `docs/scraper-tool-guide.md`.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');
const axios = require('axios'); // Added for making requests to the AI flow
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// --- CONFIGURATION ---
const CONFIG = {
  // The social media page URL to scrape photos from.
  TARGET_URL: 'https://www.facebook.com/sringerimath/photos_by',
  // Directory to save the scraped images. This will be created if it doesn't exist.
  SAVE_DIR: path.join(__dirname, '../public/scraped_media'),
  // The output JSON file that will act as our local database.
  OUTPUT_FILE: path.join(__dirname, 'scraped-data.json'),
  // The maximum number of images to scrape in a single run.
  MAX_IMAGES_TO_SCRAPE: 5, // Reduced for faster testing with AI
  // How many times to scroll down the page to load more content.
  SCROLL_COUNT: 2, // Reduced for faster testing
  // Set to `false` to see the browser in action. `true` is faster.
  HEADLESS_MODE: true,
  // Your Facebook credentials, loaded from the .env file.
  FACEBOOK_EMAIL: process.env.FACEBOOK_EMAIL,
  FACEBOOK_PASSWORD: process.env.FACEBOOK_PASSWORD,
  // The URL for the local Genkit AI server flow.
  AI_PROCESSOR_URL: 'http://localhost:4000/flows/contentProcessorFlow',
};

// --- HELPER FUNCTIONS ---

/**
 * Calls the Genkit AI flow to process raw text content.
 * @param {string} rawContent The raw text scraped from the page.
 * @returns {Promise<{title: string, keywords: string}>} A promise that resolves to the structured data.
 */
async function processContentWithAI(rawContent) {
  try {
    console.log('[AI] Processing content...');
    const response = await axios.post(CONFIG.AI_PROCESSOR_URL, {
      input: { rawContent },
    });
    console.log('[AI] Success.');
    return response.data.output;
  } catch (error) {
    console.error(`[ERROR] Failed to call AI flow at ${CONFIG.AI_PROCESSOR_URL}. Is the Genkit server running?`);
    console.error('Error details:', error.message);
    // Return default values on AI failure to avoid crashing the scraper
    return {
        title: rawContent.substring(0, 70) + (rawContent.length > 70 ? '...' : ''),
        keywords: 'default image',
    };
  }
}

/**
 * Downloads an image from a given URL and saves it to a specified path.
 * @param {string} url The URL of the image to download.
 * @param {string} filepath The path to save the image to.
 * @returns {Promise<void>}
 */
function downloadImage(url, filepath) {
    // Note: Facebook image URLs often expire or are protected.
    // This function may fail if the URL is not a direct, public link.
    // A more robust implementation might require handling cookies from the Puppeteer session.
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
        fileStream.on('error', (err) => reject(err));
      } else {
        reject(new Error(`Failed to download image. Status code: ${res.statusCode}`));
      }
    }).on('error', (err) => reject(err));
  });
}

/**
 * The main scraper function.
 */
async function runScraper() {
  if (!CONFIG.FACEBOOK_EMAIL || !CONFIG.FACEBOOK_PASSWORD || CONFIG.FACEBOOK_EMAIL === 'your_email@example.com' || CONFIG.FACEBOOK_PASSWORD === 'your_facebook_password') {
    console.error('\nERROR: Facebook credentials are not set correctly in your .env file.');
    console.error('Please open the .env file in the root directory of your project and replace the placeholder values with your actual Facebook login information.\n');
    return;
  }

  console.log(`[INFO] Starting scraper for: ${CONFIG.TARGET_URL}`);
  console.log(`[INFO] Make sure your Genkit server is running: npm run genkit:watch`);

  const browser = await puppeteer.launch({
    headless: CONFIG.HEADLESS_MODE,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-zygote'
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const allMediaDocs = []; // Array to hold all our scraped data.

  try {
    if (!fs.existsSync(CONFIG.SAVE_DIR)) {
      fs.mkdirSync(CONFIG.SAVE_DIR, { recursive: true });
    }

    console.log('[INFO] Navigating to login page...');
    await page.goto('https://www.facebook.com/login', { waitUntil: 'networkidle2' });
    await page.type('#email', CONFIG.FACEBOOK_EMAIL);
    await page.type('#pass', CONFIG.FACEBOOK_PASSWORD);
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('#loginbutton'),
    ]);
    console.log('[SUCCESS] Login successful.');

    console.log(`[INFO] Navigating to target page: ${CONFIG.TARGET_URL}`);
    await page.goto(CONFIG.TARGET_URL, { waitUntil: 'networkidle2' });

    console.log(`[INFO] Scrolling ${CONFIG.SCROLL_COUNT} times...`);
    for (let i = 0; i < CONFIG.SCROLL_COUNT; i++) {
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log('[INFO] Extracting post and image data...');
    const extractedData = await page.evaluate(() => {
        const photoContainers = document.querySelectorAll('a[href*="/photo/"]');
        const results = [];
        for (const container of photoContainers) {
            const imgElement = container.querySelector('img');
            const url = container.href;
            if (imgElement && imgElement.src && url) {
                 results.push({
                    sourceUrl: url,
                    imageUrl: imgElement.src,
                    description: imgElement.alt || 'No description found.',
                });
            }
        }
        return results;
    });

    if (extractedData.length === 0) {
        console.warn("[WARNING] No images found. The CSS selectors are likely outdated.");
        await browser.close();
        return;
    }

    console.log(`[INFO] Found ${extractedData.length} potential images. Processing up to ${CONFIG.MAX_IMAGES_TO_SCRAPE}...`);

    for (const item of extractedData.slice(0, CONFIG.MAX_IMAGES_TO_SCRAPE)) {
        try {
            const imageName = `scraped-${Date.now()}-${path.basename(new URL(item.imageUrl).pathname)}.jpg`;
            const savePath = path.join(CONFIG.SAVE_DIR, imageName);

            console.log(`[DOWNLOAD] Downloading image from ${item.imageUrl}...`);
            await downloadImage(item.imageUrl, savePath);
            
            // Process the description with our AI flow
            const aiContent = await processContentWithAI(item.description);

            const mediaDoc = {
                id: `scraped-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                peetham: 'Sringeri', // Hardcoded for this scraper; could be a parameter
                type: 'photo', // Essential for the calendar to render correctly
                title: aiContent.title, // Using AI-generated title
                description: item.description, // Keeping original description
                imageUrl: `/scraped_media/${imageName}`, // Path relative to the public folder
                thumbnailUrl: `/scraped_media/${imageName}`, // Use same image for thumbnail
                aiHint: aiContent.keywords, // Using AI-generated keywords
            };
            
            console.log(`[SUCCESS] Saved image to ${savePath}.`);
            allMediaDocs.push(mediaDoc);

        } catch (downloadError) {
            console.error(`[ERROR] Failed to download/process image from ${item.sourceUrl}:`, downloadError.message);
        }
    }

    // Write the collected data to the output file.
    fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(allMediaDocs, null, 2));
    
    console.log(`\n[COMPLETE] Scraping finished. ${allMediaDocs.length} records saved to ${CONFIG.OUTPUT_FILE}`);
    console.log(`[ACTION] Refresh your Bodha Calendar page to see the new images.`);

  } catch (error) {
    console.error('[FATAL] An error occurred:', error);
    await page.screenshot({ path: 'error_screenshot.png' });
    console.error('[DEBUG] Screenshot saved to error_screenshot.png');
  } finally {
    await browser.close();
  }
}

runScraper().catch(console.error);

    