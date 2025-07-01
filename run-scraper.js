
require('ts-node').register();
const scraper = require('./src/lib/facebook-scraper');

scraper.scrapeFacebookPage('https://www.facebook.com/sringerimath/videos', 'src/lib/sringeri-facebook-videos.json');
