
import type { Peetham } from './events-data';

interface ScrapingSourceItem {
    date: string; // YYYY-MM-DD
    peetham: Peetham;
    imageUrl: string;
    description: string;
}

// =================================================================================================
//  YOUR CURATED CONTENT SOURCE
// =================================================================================================
// This is the single source of truth for the `npm run scrape` command.
// Add new items to this array to populate your website's database.
//
// HOW TO ADD NEW CONTENT:
// 1. Find an image you want to use. A good source is https://unsplash.com.
// 2. Get the direct image URL. For Unsplash, you can right-click the image and "Copy Image Address".
// 3. Find a relevant description or write your own.
// 4. Add a new object to the array below with the correct date, peetham, imageUrl, and description.
//
// EXAMPLE:
// {
//     date: '2024-07-25',
//     peetham: 'Sringeri',
//     imageUrl: 'https://images.unsplash.com/photo-1620058866387-a3c39a04a52c',
//     description: 'A beautiful painting of a wise sage lost in the study of sacred scriptures, representing the pursuit of knowledge.'
// }
// =================================================================================================

export const scrapingSourceData: ScrapingSourceItem[] = [
    // --- SRINGERI ---
    {
        date: '2024-07-21',
        peetham: 'Sringeri',
        imageUrl: 'https://images.unsplash.com/photo-1617664693373-57c2a5315579',
        description: 'An artistic depiction of the grand darbar of the Jagadguru during the auspicious Navaratri festival, a tradition continuing for centuries at Sringeri, filled with devotion and spiritual splendor.'
    },
    {
        date: '2024-07-15',
        peetham: 'Sringeri',
        imageUrl: 'https://images.unsplash.com/photo-1620058866387-a3c39a04a52c',
        description: 'A vibrant painting capturing a serene moment of a sage deeply engrossed in ancient scriptures, symbolizing the eternal quest for knowledge nurtured at the Sringeri Sharada Peetham.'
    },
    {
        date: '2024-06-30',
        peetham: 'Sringeri',
        imageUrl: 'https://images.unsplash.com/photo-1618335934988-a0c1a1a79872',
        description: 'A colorful artwork representing the vast ocean of spiritual texts and sacred objects that form the foundation of teachings at Sringeri, inspiring devotees and seekers of truth.'
    },

    // --- DWARAKA ---
    {
        date: '2024-07-20',
        peetham: 'Dwaraka',
        imageUrl: 'https://images.unsplash.com/photo-1628882782353-a50e181e5b87',
        description: 'A mystical painting of the legendary city of Dwaraka, submerged in glory, representing the spiritual heritage of the western Peetham established by Adi Shankaracharya.'
    },
    {
        date: '2024-07-11',
        peetham: 'Dwaraka',
        imageUrl: 'https://images.unsplash.com/photo-1619364424997-1b0a88a4e32e',
        description: 'An artistic portrayal of a spiritual gathering, where devotees connect and share knowledge, reflecting the community spirit fostered by the Dwaraka Peetham.'
    },
    {
        date: '2024-06-25',
        peetham: 'Dwaraka',
        imageUrl: 'https://images.unsplash.com/photo-1601140994903-b09590822554',
        description: 'A magnificent artwork of the Dwarakadhish temple, standing tall as a beacon of faith and devotion on the western coast of India.'
    },

    // --- PURI ---
    {
        date: '2024-07-07',
        peetham: 'Puri',
        imageUrl: 'https://images.unsplash.com/photo-1617877924522-3599b5a45a0b',
        description: 'An evocative painting of the grand Ratha Yatra festival in Puri, where Lord Jagannath emerges to bless the devotees, a spectacle of immense devotion overseen by the Govardhana Peetham.'
    },
    {
        date: '2024-07-01',
        peetham: 'Puri',
        imageUrl: 'https://images.unsplash.com/photo-1632285886676-b0761e3d36b7',
        description: 'A detailed artistic rendering of the majestic chariot of Lord Jagannath, symbolizing the journey of the divine through the world.'
    },
    {
        date: '2024-06-22',
        peetham: 'Puri',
        imageUrl: 'https://images.unsplash.com/photo-1628793473432-1595eb488349',
        description: 'A touching painting illustrating the concept of Seva (selfless service), with hands offering devotion, a core tenet of the spiritual practices at Puri.'
    },

    // --- JYOTIRMATH ---
    {
        date: '2024-07-18',
        peetham: 'Jyotirmath',
        imageUrl: 'https://images.unsplash.com/photo-1618163989396-85764724a737',
        description: 'A breathtaking painting of the serene Himalayan mountains, the abode of the Jyotirmath Peetham, where sages have meditated for millennia.'
    },
    {
        date: '2024-07-10',
        peetham: 'Jyotirmath',
        imageUrl: 'https://images.unsplash.com/photo-1549619845-107f95a4a52d',
        description: 'An artistic vision of the snow-clad peaks surrounding the Badrinath region, representing the purity and spiritual power of the northern Peetham.'
    },
    {
        date: '2024-06-28',
        peetham: 'Jyotirmath',
        imageUrl: 'https://images.unsplash.com/photo-1617634661839-92161289942c',
        description: 'A vibrant illustration of a meditating yogi in the Himalayas, capturing the essence of the profound spiritual practices associated with Jyotirmath.'
    },
];
