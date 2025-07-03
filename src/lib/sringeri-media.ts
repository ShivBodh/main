
export type VideoArchiveItem = {
    id: string;
    title: string;
    description: string;
    date: string; // YYYY-MM-DD
    videoId: string; // YouTube Video ID
    source: 'YouTube';
    thumbnailUrl: string;
  };
  
  export const sringeriVideoArchive: VideoArchiveItem[] = [
    {
      id: 'vyc-2024-07-20',
      title: `Jagadgurus' Anugraha Bhashanam on Vyasa Puja`,
      description: 'The sacred address delivered by Jagadguru Sri Sri Bharati Tirtha Mahaswamiji and Jagadguru Sri Sri Vidhushekhara Bharati Mahaswamiji on the holy occasion of Guru Purnima / Vyasa Puja.',
      date: '2024-07-20',
      videoId: 'aqz-KE-bpKQ', // Placeholder
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'spc-2024-05-12',
      title: 'Sri Shankara Pancharatna Stotram by Sringeri Sisters',
      description: 'A melodious rendering of the Sri Shankara Pancharatna Stotram by the renowned Sringeri Sisters, offered at the lotus feet of the Acharya on Shankara Jayanti.',
      date: '2024-05-12',
      videoId: 'aqz-KE-bpKQ', // Placeholder
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'ard-2024-04-18',
      title: 'Aradhana Day Discourse',
      description: 'A special discourse given by the Jagadguru on the 31st Aradhana of Jagadguru Sri Sri Abhinava Vidyatirtha Mahaswamiji, the 35th Acharya of the Peetham.',
      date: '2024-04-18',
      videoId: 'aqz-KE-bpKQ', // Placeholder
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'navaratri-2023-10-20',
      title: 'Navaratri 2023: Day 5 Puja and Darbar',
      description: 'Glimpses of the fifth day of the Sharadamba Navaratri celebrations in 2023, including the evening Durbar.',
      date: '2023-10-20',
      videoId: 'aqz-KE-bpKQ',
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'discourse-2023-01-15',
      title: 'Discourse on Dharma',
      description: 'A timeless discourse from early 2023 on the principles of Dharma and its importance in modern life.',
      date: '2023-01-15',
      videoId: 'aqz-KE-bpKQ',
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'archive-2022-08-30',
      title: 'From the Archives: Ganesh Chaturthi 2022',
      description: 'An archival recording of the special pujas performed for Lord Ganesha during the 2022 festival.',
      date: '2022-08-30',
      videoId: 'aqz-KE-bpKQ',
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'archive-sringeri-2019',
      title: 'Discourse on Vedanta (2019)',
      description: 'An archival discourse on the core principles of Advaita Vedanta from 2019.',
      date: '2019-03-22',
      videoId: 'aqz-KE-bpKQ',
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'archive-2015-11-11',
      title: 'Deepavali Celebrations 2015',
      description: 'Archival footage of the Deepavali festival celebrations at Sringeri from 2015.',
      date: '2015-11-11',
      videoId: 'aqz-KE-bpKQ',
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'archive-2012-09-19',
      title: 'From the Archives: Ganesh Chaturthi 2012',
      description: 'An archival recording of the special pujas performed for Lord Ganesha during the 2012 festival.',
      date: '2012-09-19', 
      videoId: 'aqz-KE-bpKQ',
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'archive-2011-10-01',
      title: 'Navaratri Darbar 2011',
      description: 'Rare footage of the evening Darbar during the 2011 Navaratri celebrations at Sringeri.',
      date: '2011-10-01',
      videoId: 'aqz-KE-bpKQ',
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
    {
      id: 'archive-2010-07-25',
      title: 'Guru Purnima 2010 Anugraha Bhashanam',
      description: 'A historic Anugraha Bhashanam from the 35th Acharya, Jagadguru Sri Sri Abhinava Vidyatirtha Mahaswamiji, on Guru Purnima 2010.',
      date: '2010-07-25',
      videoId: 'aqz-KE-bpKQ',
      thumbnailUrl: 'https://placehold.co/1280x720.png',
      source: 'YouTube',
    },
  ];
  
  export const sringeriPhotoGallery = [
    { id: 'sringeri-photo-1', date: '2024-07-18', title: 'Blessings from the Jagadguru', description: 'Jagadguru Sri Sri Vidhushekhara Bharati Mahaswamiji blessing devotees.', alt: 'Jagadguru blessing devotees', src: 'https://placehold.co/400x300.png', aiHint: 'acharya blessing' },
    { id: 'sringeri-photo-2', date: '2024-07-17', title: 'Vidyasankara Temple Architecture', description: 'A view of the intricate architecture of the Vidyasankara Temple.', alt: 'Vidyasankara Temple architecture', src: 'https://placehold.co/400x300.png', aiHint: 'temple architecture' },
    { id: 'sringeri-photo-3', date: '2024-07-16', title: 'Sacred Puja Ceremony', description: 'A glimpse of a puja ceremony at the main shrine of Goddess Sharadamba.', alt: 'Puja ceremony at the main shrine', src: 'https://placehold.co/400x300.png', aiHint: 'puja ceremony' },
    { id: 'sringeri-photo-4', date: '2024-07-15', title: 'Festival Gathering', description: 'Devotees gathered during a recent festival at Sringeri.', alt: 'Crowd of devotees during a festival', src: 'https://placehold.co/400x300.png', aiHint: 'devotees gathering' },
    { id: 'sringeri-photo-5', date: '2023-04-22', title: 'Akshaya Tritiya 2023', description: 'Special golden chariot festival for Goddess Sharada on Akshaya Tritiya.', alt: 'Golden chariot festival', src: 'https://placehold.co/400x300.png', aiHint: 'golden chariot' },
    { id: 'sringeri-photo-6', date: '2022-11-08', title: 'Tunga River Aarti', description: 'The serene evening aarti performed on the banks of the Tunga River.', alt: 'Evening aarti on river bank', src: 'https://placehold.co/400x300.png', aiHint: 'river aarti' },
    { id: 'sringeri-photo-11', date: '2019-09-02', title: 'Ganesh Chaturthi 2019', description: 'An image from the Ganesh Chaturthi festival celebrations in 2019.', alt: 'Ganesh Chaturthi 2019', src: 'https://placehold.co/400x300.png', aiHint: 'ganesha festival' },
    { id: 'sringeri-photo-7', date: '2014-03-31', title: 'Ugadi Celebrations 2014', description: 'Celebrating the Telugu and Kannada New Year in 2014.', alt: 'Ugadi festival celebrations', src: 'https://placehold.co/400x300.png', aiHint: 'new year festival' },
    { id: 'sringeri-photo-8', date: '2013-11-03', title: 'Deepavali at Sringeri 2013', description: 'The Vidyasankara Temple illuminated for Deepavali in 2013.', alt: 'Temple illuminated for festival of lights', src: 'https://placehold.co/400x300.png', aiHint: 'temple lights' },
    { id: 'sringeri-photo-12', date: '2012-02-20', title: 'Maha Shivaratri 2012', description: 'Night-long vigil and prayers during Maha Shivaratri in 2012.', alt: 'Maha Shivaratri 2012', src: 'https://placehold.co/400x300.png', aiHint: 'shiva lingam' },
    { id: 'sringeri-photo-9', date: '2011-02-10', title: 'Pathashala Students 2011', description: 'A group photograph of students at the Sringeri Pathashala in 2011.', alt: 'Vedic school students', src: 'https://placehold.co/400x300.png', aiHint: 'students scholars' },
    { id: 'sringeri-photo-10', date: '2010-01-15', title: 'Makara Sankranti 2010', description: 'Early morning rituals for Makara Sankranti in 2010.', alt: 'Sankranti festival rituals', src: 'https://placehold.co/400x300.png', aiHint: 'festival ritual' },
  ];
