
/**
 * @fileoverview An AI-Powered Content Processing Tool for the Sanatana Peethams Portal.
 *
 * This script is designed to be compatible with constrained cloud environments
 * by focusing on the AI processing pipeline rather than browser automation.
 *
 * =============================================================================
 *  IMPORTANT: How to Use This AI Content Processor
 * =============================================================================
 * This tool works in conjunction with a local Genkit AI server to transform
 * raw text into structured database entries.
 *
 * 1.  **Start the Genkit AI Server:**
 *     In a separate terminal, run the following command. This server hosts the
 *     AI flow that processes text into titles and keywords.
 *     `npm run genkit:watch`
 *
 * 2.  **Run the Processor Script:**
 *     Once the Genkit server is running, open a new terminal and execute this
 *     script. It will use sample data to call the AI and build your database file.
 *     `node scripts/run-scraper.js`
 *
 * 3.  **Check the Output:**
 *     - The AI-processed metadata will be saved as a database in `scripts/scraped-data.json`.
 *     - **The processed content will automatically appear on the Bodha Calendar page.**
 *
 * For a full architectural overview, please see `docs/data-pipeline-guide.md`.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// --- CONFIGURATION ---
const CONFIG = {
  // The output JSON file that will act as our local database.
  OUTPUT_FILE: path.join(__dirname, 'scraped-data.json'),
  // Directory to save any downloaded media (currently using placeholders).
  SAVE_DIR: path.join(__dirname, '../public/scraped_media'),
  // The URL for the local Genkit AI server flow.
  AI_PROCESSOR_URL: 'http://localhost:4000/flows/contentProcessorFlow',
};

// --- SAMPLE DATA ---
// In a real-world use case, you would get this text from a webpage.
// This sample simulates the raw 'alt' text from a social media image post.
const SAMPLE_RAW_CONTENT = `Jagadguru Shankaracharya Sri Sri Bharati Tirtha Mahaswamiji and Jagadguru Sri Sri Vidhushekhara Bharati Mahaswamiji gracing the evening Sabha at the Sri Sringeri Shankara Math, Varanasi. The event marked the culmination of the annual Chaturmasya Vrata observances. #Sringeri #Shankaracharya #Varanasi`;


// --- HELPER FUNCTIONS ---

/**
 * Calls the Genkit AI flow to process raw text content.
 * @param {string} rawContent The raw text scraped from the page.
 * @returns {Promise<{title: string, keywords: string}|null>} A promise that resolves to the structured data or null on failure.
 */
async function processContentWithAI(rawContent) {
  try {
    console.log('[AI] Processing content with Genkit flow...');
    const response = await axios.post(CONFIG.AI_PROCESSOR_URL, {
      input: { rawContent },
    });
    console.log('[AI] Success. Received structured data.');
    return response.data.output;
  } catch (error) {
    console.error(`[ERROR] Failed to call AI flow at ${CONFIG.AI_PROCESSOR_URL}.`);
    if (error.code === 'ECONNREFUSED') {
        console.error('[ERROR] Connection refused. Is the Genkit server running? Use `npm run genkit:watch`.');
    } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('[ERROR] The AI flow reported an error. Check the Genkit server terminal for details.');
        console.error(`[DEBUG] Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
    } else {
        console.error('[ERROR] An unexpected error occurred during the request.');
        console.error('Error details:', error.message);
    }
    // Return null on AI failure so the caller can handle it gracefully.
    return null;
  }
}

/**
 * The main processing function.
 */
async function runProcessor() {
  console.log(`[INFO] Starting AI content processor.`);
  console.log(`[INFO] Make sure your Genkit server is running: npm run genkit:watch`);

  try {
    if (!fs.existsSync(CONFIG.SAVE_DIR)) {
      fs.mkdirSync(CONFIG.SAVE_DIR, { recursive: true });
    }

    // Process the sample content with our AI flow
    let aiContent = await processContentWithAI(SAMPLE_RAW_CONTENT);

    // Defensive check to prevent crashes if the AI returns an unexpected structure.
    if (!aiContent || typeof aiContent.title === 'undefined' || typeof aiContent.keywords === 'undefined') {
        console.error('[FATAL] AI processing did not return the expected data structure (title, keywords).');
        console.error('[DEBUG] Received from AI flow:', JSON.stringify(aiContent, null, 2));
        console.log('[INFO] Using fallback data to create database entry.');
        aiContent = {
            title: SAMPLE_RAW_CONTENT.substring(0, 70) + (SAMPLE_RAW_CONTENT.length > 70 ? '...' : ''),
            keywords: 'default image',
        };
    }

    // Create a database document with the AI-processed data
    // We use a placeholder image here, as the browser automation part is not viable.
    const mediaDoc = {
        id: `processed-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        peetham: 'Sringeri', // This can be inferred or set as a parameter
        type: 'photo', // Essential for the calendar to render correctly
        title: aiContent.title, // This is now safe
        description: SAMPLE_RAW_CONTENT, // Keeping original description for context
        imageUrl: 'https://images.unsplash.com/photo-1596701532936-64619d8039a8?q=80&w=600&h=400&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1596701532936-64619d8039a8?q=80&w=400&h=300&fit=crop',
        aiHint: aiContent.keywords, // This is also safe
    };
    
    // For this demonstration, we'll save a single processed item.
    // In a batch process, you would collect all items into an array.
    const outputData = [mediaDoc];

    // Write the collected data to the output file.
    fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(outputData, null, 2));
    
    console.log(`\n[COMPLETE] Processing finished. 1 record saved to ${CONFIG.OUTPUT_FILE}`);
    console.log(`[ACTION] Refresh your Bodha Calendar page to see the new, AI-processed content.`);

  } catch (error) {
    console.error('[FATAL] An error occurred during processing:', error);
  }
}

runProcessor().catch(console.error);
