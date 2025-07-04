
export interface Verse {
  number: number;
  sanskrit: string[];
  hindi: string;
  english: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pdfUrl: string; // This can be used for a "Download PDF" feature later
  imageUrl: string;
  aiHint: string;
  content?: Verse[];
}

export const readingList: Book[] = [
  {
    id: 'bhaja-govindam',
    title: 'Bhaja Govindam',
    author: 'Adi Shankaracharya',
    description: 'A powerful hymn that emphasizes the importance of devotion and seeking Govinda (God) as the ultimate goal, cutting through worldly attachments.',
    pdfUrl: '#',
    imageUrl: 'https://placehold.co/400x600.png',
    aiHint: 'devotion supreme being',
    content: [
      {
        number: 1,
        sanskrit: [
          'भजगोविन्दं भजगोविन्दं, गोविन्दं भजमूढमते ।',
          'सम्प्राप्ते सन्निहिते काले, नहि नहि रक्षति डुकृञ्करणे ॥'
        ],
        hindi: 'हे मूढ़बुद्धि! गोविन्द का भजन कर, गोविन्द का भजन कर, गोविन्द का ही भजन कर। जब मृत्यु का समय निकट आ जायेगा, तो व्याकरण के नियम तुम्हारी रक्षा नहीं कर सकेंगे॥',
        english: 'Worship Govinda, Worship Govinda, Worship Govinda, O deluded mind! When the appointed time (death) arrives, the rules of grammar will not save you.'
      },
      {
        number: 2,
        sanskrit: [
            'मूढ जहीहि धनागमतृष्णां, कुरु सद्बुद्धिं मनसि वितृष्णाम् ।',
            'यल्लभसे निजकर्मोपात्तं, वित्तं तेन विनोदय चित्तम् ॥'
        ],
        hindi: 'हे मूढ़! धन-प्राप्ति की तृष्णा को त्याग दे, अपने मन में सद्बुद्धि और तृष्णाहीनता का विकास कर। अपने कर्मों से जो भी धन प्राप्त हो, उसी से अपने चित्त को प्रसन्न रख।',
        english: 'O deluded one, give up your thirst for accumulating wealth. Develop good sense and contentment in your mind. With whatever wealth you acquire through your own karma, be content.'
      },
      {
          number: 3,
          sanskrit: [
              'नारीस्तनभरनाभीदेशं, दृष्ट्वा मा गा मोहावेशम् ।',
              'एतन्मांसवसादिविकारं, मनसि विचिन्तय वारं वारम् ॥'
          ],
          hindi: 'नारी के शरीर के अंगों को देखकर मोह में मत पड़ो। अपने मन में बार-बार विचार करो कि यह सब मांस, वसा आदि का ही विकार है।',
          english: 'Do not get lost in infatuation by looking at the physical beauty of a woman. Repeatedly remind your mind that this is but a modification of flesh and fat.'
      }
    ]
  },
];
