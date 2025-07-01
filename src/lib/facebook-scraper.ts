
import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';

// This scraper is more resilient to environmental limitations than the Playwright version.
// However, it is still vulnerable to changes in Facebook's HTML structure.

export async function scrapeFacebookPage(url: string, outputPath: string) {
    try {
        console.log(`Starting scraper for ${url}...`);

        const { data: html } = await axios.get(url, {
            headers: {
                // Emulate a regular user agent to avoid being blocked
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            },
        });

        console.log('Successfully fetched the page content.');
        const $ = cheerio.load(html);

        console.log('Extracting video data...');
        // This selector is a guess based on common Facebook page structures and may need updating.
        const videoElements = $('div.x1yztbdb');
        const videos: any[] = [];

        videoElements.each((index, element) => {
            const titleElement = $(element).find('a[aria-label]');
            const videoLinkElement = $(element).find('a[href*="/videos/"]');
            
            if (titleElement.length > 0 && videoLinkElement.length > 0) {
                const title = titleElement.attr('aria-label');
                const link = 'https://www.facebook.com' + videoLinkElement.attr('href');
                
                // The description and date are often not available in this simplified view.
                videos.push({
                    title: title,
                    link: link,
                    description: 'Description not available in this view.',
                    date: 'Date not available',
                });
            }
        });

        console.log(`Found ${videos.length} videos.`);

        if (videos.length > 0) {
            console.log(`Saving scraped data to ${outputPath}...`);
            await fs.writeFile(outputPath, JSON.stringify(videos, null, 2));
            console.log('Data saved successfully.');
        } else {
            console.log('No videos found. The scraper might need to be updated, or the page structure has changed.');
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Axios error during scraping: ${error.message}`);
            if (error.response) {
                console.error(`Status: ${error.response.status}`);
            }
        } else {
            console.error('An unexpected error occurred during scraping:', error);
        }
    } finally {
        console.log('Scraper finished.');
    }
}
