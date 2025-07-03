
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  // Using a placeholder URL as I cannot provide actual PDFs.
  pdfUrl: string;
  imageUrl: string;
  aiHint: string;
}

export const readingList: Book[] = [
  {
    id: 'vivekachudamani',
    title: 'Vivekachudamani',
    author: 'Adi Shankaracharya',
    description: 'A masterpiece of Advaita Vedanta, this "Crest-Jewel of Discrimination" outlines the path to self-realization through discerning the real from the unreal.',
    pdfUrl: '#', // Placeholder link
    imageUrl: 'https://placehold.co/400x600.png',
    aiHint: 'book cover',
  },
  {
    id: 'atma-bodha',
    title: 'Atma Bodha',
    author: 'Adi Shankaracharya',
    description: 'A short treatise on Advaita Vedanta, "Self-Knowledge" is composed of sixty-eight verses, providing a clear exposition of the nature of the Self.',
    pdfUrl: '#', // Placeholder link
    imageUrl: 'https://placehold.co/400x600.png',
    aiHint: 'book cover abstract',
  },
  {
    id: 'tattva-bodha',
    title: 'Tattva Bodha',
    author: 'Adi Shankaracharya',
    description: 'An introductory text that explains the fundamental terms and concepts of Vedanta, making it an essential prerequisite for deeper study.',
    pdfUrl: '#', // Placeholder link
    imageUrl: 'https://placehold.co/400x600.png',
    aiHint: 'book cover knowledge',
  },
    {
    id: 'bhaja-govindam',
    title: 'Bhaja Govindam',
    author: 'Adi Shankaracharya',
    description: 'A powerful hymn that emphasizes the importance of devotion and seeking Govinda (God) as the ultimate goal, cutting through worldly attachments.',
    pdfUrl: '#', // Placeholder link
    imageUrl: 'https://placehold.co/400x600.png',
    aiHint: 'book cover devotion',
  },
    {
    id: 'upadesasahasri',
    title: 'Upadesasahasri',
    author: 'Adi Shankaracharya',
    description: '"A Thousand Teachings" is one of the most important works of Shankara, consisting of a prose and a poetry section, detailing the path to liberation.',
    pdfUrl: '#', // Placeholder link
    imageUrl: 'https://placehold.co/400x600.png',
    aiHint: 'book cover wisdom',
  },
    {
    id: 'aparokshanubhuti',
    title: 'Aparokshanubhuti',
    author: 'Adi Shankaracharya',
    description: '"Direct Experience," this work outlines the path of Jnana Yoga and provides a step-by-step method for experiencing the Self directly.',
    pdfUrl: '#', // Placeholder link
    imageUrl: 'https://placehold.co/400x600.png',
    aiHint: 'book cover experience',
  },
];
