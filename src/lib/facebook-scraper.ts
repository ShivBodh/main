
import { chromium, Page } from 'playwright-core';
import { promises as fs } from 'fs';

// This scraper uses Playwright to simulate a real browser, allowing it to
// handle JavaScript-heavy pages and scroll to load more content.

export async function scrapeFacebookPage(url: string, outputPath: string, scrollCount: number = 5) {
  let browser = null;
  try {
    console.log(`Launching browser...`);
    // This assumes Playwright's browser is installed via `npx playwright install` or similar
    // For Firebase Studio, the browser is pre-installed.
    browser = await chromium.launch({
      executablePath: require('@playwright/browser-chromium').executablePath(),
      headless: true
    });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    const page = await context.newPage();

    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // In many regions, a login prompt or cookie consent dialog appears.
    // We try to find and click a "Not Now" or "Decline" button.
    try {
        const declineButton = page.locator('div[aria-label="Decline optional cookies"]');
        if (await declineButton.isVisible()) {
            console.log('Closing cookie consent dialog...');
            await declineButton.click();
            await page.waitForTimeout(1000);
        }
    } catch (e) {
        console.log('No cookie dialog found, or it could not be closed. Continuing...');
    }


    console.log('Page loaded. Starting scroll to load more videos...');
    for (let i = 0; i < scrollCount; i++) {
        console.log(`Scrolling... (${i + 1}/${scrollCount})`);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(3000); // Wait for content to load
    }
    console.log('Finished scrolling.');

    console.log('Extracting video data...');
    const videos = await page.evaluate(() => {
        // This selector targets the container for each video in the grid.
        // It is subject to change if Facebook updates its HTML structure.
        const videoElements = document.querySelectorAll('div.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z');
        const results: any[] = [];
        videoElements.forEach((element, index) => {
            const linkElement = element.querySelector('a.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.x1exk60e.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x1lq5wgf.xgqcy7s.x30kzoy.x9jhf4c.x78zum5');
            const imageElement = element.querySelector('img.x1ey2m1c.xds687c.x5yr21d.x10l6tdf.x1n2onr6.x1plvlek.xryxfnj');
            const titleElement = element.querySelector('span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6');
            
            if (linkElement && imageElement && titleElement) {
                const url = (linkElement as HTMLAnchorElement).href;
                const thumbnailUrl = (imageElement as HTMLImageElement).src;
                const title = titleElement.textContent || 'Untitled';
                
                results.push({
                    id: `scraped-${index}-${new Date().getTime()}`,
                    title: title,
                    // Note: Extracting the exact date is complex as it's often relative (e.g., "3 days ago").
                    // A more advanced scraper would be needed to parse this reliably. Using a placeholder for now.
                    date: new Date().toISOString().split('T')[0], 
                    url: url,
                    description: 'Description scraped from page. Please verify content.',
                    thumbnailUrl: thumbnailUrl,
                });
            }
        });
        return results;
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
    console.error('An error occurred during scraping:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
    console.log('Scraper finished.');
  }
}
