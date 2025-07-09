
/**
 * @fileoverview This is your content source file.
 *
 * This file is pre-filled with high-quality starter content to demonstrate
 * how the portal works. You can (and should!) replace this with your own
 * curated content.
 *
 * To add your own content, follow these steps:
 * 1. Find a post on social media (e.g., from a Peetham's Facebook page).
 * 2. Right-click the image and select "Copy Image Address" or "Copy Image Link".
 * 3. Replace one of the items below, or add a new one.
 * 4. Paste the image link into the `imageUrl` field.
 * 5. Copy the post's text and paste it into the `description` field.
 * 6. Set the `date` and `peetham`.
 * 7. Provide a one or two-word `aiHint` for the image.
 *
 * =============================================================================
 *
 * After adding or changing the data, run this command in your terminal:
 *
 * npm run scrape
 *
 * This will process your content, use AI to generate titles, and save it to
 * the database, making it appear on the Bodha Calendar and Peetham pages.
 *
 */

export const scrapingSourceData: {
  date: string,
  peetham: 'Sringeri' | 'Dwaraka' | 'Puri' | 'Jyotirmath',
  imageUrl: string,
  aiHint: string,
  description: string,
}[] = [
  // SRINGERI STARTER CONTENT
  {
    date: '2024-07-21',
    peetham: 'Sringeri',
    imageUrl: 'https://images.unsplash.com/photo-1617664693373-57c2a5315579?q=80&w=600&h=400&fit=crop',
    aiHint: 'acharya blessing',
    description: 'A moment of profound serenity as the Jagadguru Shankaracharya of Sringeri bestows blessings upon devotees. The air, thick with devotion, carries the chants that have echoed through these halls for centuries.',
  },
  {
    date: '2024-07-20',
    peetham: 'Sringeri',
    imageUrl: 'https://images.unsplash.com/photo-1628793473432-1595eb488349?q=80&w=600&h=400&fit=crop',
    aiHint: 'temple architecture',
    description: 'The magnificent Vidyashankara Temple at Sringeri, an architectural marvel dedicated to both Shaiva and Vaishnava traditions, stands as a testament to the unifying philosophy of Advaita Vedanta.',
  },

  // DWARAKA STARTER CONTENT
  {
    date: '2024-07-19',
    peetham: 'Dwaraka',
    imageUrl: 'https://images.unsplash.com/photo-1628882782353-a50e181e5b87?q=80&w=600&h=400&fit=crop',
    aiHint: 'krishna painting',
    description: 'An artistic depiction of Lord Krishna, the presiding deity of Dwaraka. The teachings of the Dwaraka Sharada Peetham are deeply rooted in the philosophy shared by the Lord in the Bhagavad Gita.',
  },
  {
    date: '2024-07-18',
    peetham: 'Dwaraka',
    imageUrl: 'https://images.unsplash.com/photo-1601140994903-b09590822554?q=80&w=600&h=400&fit=crop',
    aiHint: 'ocean temple',
    description: 'The sun sets over the Arabian Sea, casting a golden glow on the flag of the Dwarkadhish Temple. The western Peetham stands as a beacon of Dharma on the coast of ancient history.',
  },

  // PURI STARTER CONTENT
  {
    date: '2024-07-17',
    peetham: 'Puri',
    imageUrl: 'https://images.unsplash.com/photo-1617877924522-3599b5a45a0b?q=80&w=600&h=400&fit=crop',
    aiHint: 'jagannath art',
    description: 'A vibrant painting capturing the divine triad of Lord Jagannath, Balabhadra, and Subhadra. The Govardhana Peetham at Puri shares a sacred and inseparable bond with the traditions of the Jagannath Temple.',
  },
  {
    date: '2024-07-16',
    peetham: 'Puri',
    imageUrl: 'https://images.unsplash.com/photo-1632285886676-b0761e3d36b7?q=80&w=600&h=400&fit=crop',
    aiHint: 'festival chariot',
    description: 'Devotees gather around the magnificent chariots during the annual Rath Yatra festival in Puri, a vibrant celebration of faith and devotion overseen by the spiritual guidance of the Shankaracharya.',
  },
  
  // JYOTIRMATH STARTER CONTENT
  {
    date: '2024-07-15',
    peetham: 'Jyotirmath',
    imageUrl: 'https://images.unsplash.com/photo-1618163989396-85764724a737?q=80&w=600&h=400&fit=crop',
    aiHint: 'shiva himalayas',
    description: 'An evocative painting of Lord Shiva in deep meditation, embodying the serene and profound spiritual energy of the Himalayas, the home of the Jyotirmath Peetham.',
  },
  {
    date: '2024-07-14',
    peetham: 'Jyotirmath',
    imageUrl: 'https://images.unsplash.com/photo-1549619845-107f95a4a52d?q=80&w=600&h=400&fit=crop',
    aiHint: 'himalayan landscape',
    description: 'The majestic snow-capped peaks of the Himalayas stand guard over the sacred town of Jyotirmath, the northern bastion of Advaita Vedanta established by Adi Shankaracharya.',
  },
];
