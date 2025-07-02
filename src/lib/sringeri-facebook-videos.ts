
import scrapedData from './sringeri-facebook-videos.json';

export type FacebookVideo = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    url: string; // Direct link to the Facebook video
    description: string;
    thumbnailUrl: string;
};

// This data is now dynamically populated by running `node run-scraper.js`.
// The JSON file is imported here to be used throughout the application.
export const sringeriFacebookVideos: FacebookVideo[] = scrapedData;
