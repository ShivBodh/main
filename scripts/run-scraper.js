
/**
 * @fileoverview A more robust Scraper Tool for the Sanatana Peethams Portal.
 *
 * This script uses Puppeteer to launch a headless Chrome browser, navigate to a
 * target social media page, extract image data, and download the images to a

 * local directory.
 *
 * This tool is designed to be configurable and serves as a strong foundation
 * for building a data pipeline.
 *
 * =============================================================================
 *  IMPORTANT: How to Use This Tool
 * =============================================================================
 * 1.  **Configure Settings:** Update the `CONFIG` object below with your
 *     target URL, Facebook credentials (in your .env file), and other options.
 *
 * 2.  **Install Dependencies:** Ensure you have run `npm install` so that
 *     `puppeteer` is available.
 *
 * 3.  **Run the Scraper:** From your terminal, execute the script:
 *     `node scripts/run-scraper.js`
 *
 * 4.  **Check the Output:** Images will be saved to the directory specified in
 *     `SAVE_DIR`. Metadata for each image will be logged to the console.
 *
 * 5.  **Maintain Selectors:** Social media websites change their code often.
 *     The CSS selectors in `page.evaluate` will break over time. You MUST
 *     use your browser's Developer Tools to find the new, correct selectors
 *     and update them in the script for it to continue working.
 *
 * For a full architectural overview, please see `docs/scraper-tool-guide.md`.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// --- CONFIGURATION ---
const CONFIG = {
  // The social media page URL to scrape photos from.
  TARGET_URL: 'https://www.facebook.com/sringerimath/photos_by',
  // Directory to save the scraped images. This will be created if it doesn't exist.
  SAVE_DIR: path.join(__dirname, '../public/scraped_media'),
  // The maximum number of images to scrape in a single run.
  MAX_IMAGES_TO_SCRAPE: 20,
  // How many times to scroll down the page to load more content.
  SCROLL_COUNT: 5,
  // Set to `false` to see the browser in action. `true` is faster.
  HEADLESS_MODE: true,
  // Optional: Add a proxy server for requests. E.g., 'http://your-proxy-server:port'
  PROXY_URL: null, // 'http://127.0.0.1:8080'
  // Your Facebook credentials, loaded from the .env file.
  FACEBOOK_EMAIL: process.env.FACEBOOK_EMAIL || '',
  FACEBOOK_PASSWORD: process.env.FACEBOOK_PASSWORD || '',
};

// --- HELPER FUNCTIONS ---

/**
 * Downloads an image from a given URL and saves it to a specified path.
 * @param {string} url The URL of the image to download.
 * @param {string} filepath The path to save the image to.
 * @returns {Promise<void>}
 */
function downloadImage(url, filepath) {
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
  if (!CONFIG.FACEBOOK_EMAIL || !CONFIG.FACEBOOK_PASSWORD) {
    console.error('ERROR: Facebook credentials are not set in your .env file.');
    console.error('Please add FACEBOOK_EMAIL and FACEBOOK_PASSWORD to the .env file in the project root.');
    return;
  }

  console.log(`[INFO] Starting scraper for: ${CONFIG.TARGET_URL}`);
  console.log(`[INFO] Saving images to: ${CONFIG.SAVE_DIR}`);

  const browserArgs = ['--no-sandbox', '--disable-setuid-sandbox'];
  if (CONFIG.PROXY_URL) {
    browserArgs.push(`--proxy-server=${CONFIG.PROXY_URL}`);
  }

  const browser = await puppeteer.launch({
    headless: CONFIG.HEADLESS_MODE,
    args: browserArgs,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    // 1. Create save directory if it doesn't exist
    if (!fs.existsSync(CONFIG.SAVE_DIR)) {
      fs.mkdirSync(CONFIG.SAVE_DIR, { recursive: true });
      console.log(`[INFO] Created save directory: ${CONFIG.SAVE_DIR}`);
    }

    // 2. Navigate and Login
    console.log('[INFO] Navigating to login page...');
    await page.goto('https://www.facebook.com/login', { waitUntil: 'networkidle2' });
    await page.type('#email', CONFIG.FACEBOOK_EMAIL);
    await page.type('#pass', CONFIG.FACEBOOK_PASSWORD);
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('#loginbutton'),
    ]);
    console.log('[SUCCESS] Login successful.');

    // 3. Go to target page
    console.log(`[INFO] Navigating to target page: ${CONFIG.TARGET_URL}`);
    await page.goto(CONFIG.TARGET_URL, { waitUntil: 'networkidle2' });

    // 4. Scroll to load content
    console.log(`[INFO] Scrolling ${CONFIG.SCROLL_COUNT} times to load more content...`);
    for (let i = 0; i < CONFIG.SCROLL_COUNT; i++) {
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for new content
    }

    // 5. Extract Data
    // NOTE: These selectors are examples and WILL CHANGE when Facebook updates its website.
    // You must inspect the page with developer tools to find the correct, current selectors.
    console.log('[INFO] Extracting post and image data...');
    const extractedData = await page.evaluate(() => {
        // This selector targets the container for each photo in a grid view.
        const photoContainers = document.querySelectorAll('a[href*="/photo/"]');
        const results = [];
        for (const container of photoContainers) {
            const imgElement = container.querySelector('img');
            const url = container.href;
            
            if (imgElement && imgElement.src && url) {
                 results.push({
                    sourceUrl: url,
                    imageUrl: imgElement.src, // This is often a lower-res thumbnail
                    description: imgElement.alt || 'No description found.',
                });
            }
        }
        return results;
    });

    if (extractedData.length === 0) {
        console.warn("[WARNING] No images found. The CSS selectors are likely outdated.");
        console.warn("Please inspect the Facebook page structure and update the selectors inside the `page.evaluate` function in this script.");
        await browser.close();
        return;
    }

    console.log(`[INFO] Found ${extractedData.length} potential images. Processing up to ${CONFIG.MAX_IMAGES_TO_SCRAPE}...`);

    // 6. Process and Download
    const finalMediaData = [];
    for (const item of extractedData.slice(0, CONFIG.MAX_IMAGES_TO_SCRAPE)) {
        try {
            const imageName = `scraped-${Date.now()}-${path.basename(new URL(item.imageUrl).pathname)}.jpg`;
            const savePath = path.join(CONFIG.SAVE_DIR, imageName);

            console.log(`[DOWNLOAD] Downloading image from ${item.imageUrl}...`);
            await downloadImage(item.imageUrl, savePath);
            
            const mediaDoc = {
                id: `scraped-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                title: item.description.substring(0, 70) + (item.description.length > 70 ? '...' : ''),
                description: item.description,
                peetham: 'Sringeri', // Example: This should be configured based on the target
                sourceUrl: item.sourceUrl,
                // In a real app, these would point to your own cloud storage URLs
                // after uploading the downloaded file.
                localPath: savePath,
                imageUrl: `/scraped_media/${imageName}`, // URL path for the local server
                thumbnailUrl: `/scraped_media/${imageName}`, // Use same for simplicity
                aiHint: "scraped image"
            };
            
            finalMediaData.push(mediaDoc);
            console.log(`[SUCCESS] Saved image to ${savePath}.`);
            // Log the metadata that you would save to your database (e.g., Firestore)
            console.log('[METADATA]', JSON.stringify(mediaDoc, null, 2));

        } catch (downloadError) {
            console.error(`[ERROR] Failed to download or process image from ${item.sourceUrl}:`, downloadError.message);
        }
    }
    
    console.log(`\n[COMPLETE] Scraping finished. Successfully processed and downloaded ${finalMediaData.length} images.`);

  } catch (error) {
    console.error('[FATAL] An error occurred during the scraping process:', error);
    await page.screenshot({ path: 'error_screenshot.png' });
    console.error('[DEBUG] A screenshot has been saved as error_screenshot.png');
  } finally {
    await browser.close();
    console.log('[INFO] Browser closed.');
  }
}

// Run the scraper
runScraper().catch(console.error);
