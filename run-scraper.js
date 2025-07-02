
require('ts-node').register();
const scraper = require('./src/lib/facebook-scraper');

const SRINGERI_VIDEOS_URL = 'https://www.facebook.com/sringerimath/videos';
const SRINGERI_OUTPUT_PATH = 'src/lib/sringeri-facebook-videos.json';

// The third argument is the number of times to scroll down the page.
// Increase this number to scrape more historical data. Each scroll loads
// roughly 8-10 more videos. Be aware that very high numbers will take longer.
const SCROLL_COUNT = 5; 

console.log(`This script will scrape the Sringeri Math Facebook page for the latest videos.`);
console.log(`It will scroll ${SCROLL_COUNT} times to load older content.`);
console.log('To change the scroll count, edit the SCROLL_COUNT variable in this file (run-scraper.js).\n');


scraper.scrapeFacebookPage(SRINGERI_VIDEOS_URL, SRINGERI_OUTPUT_PATH, SCROLL_COUNT);
