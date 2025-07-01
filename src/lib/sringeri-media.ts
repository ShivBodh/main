
export type VideoArchiveItem = {
    id: string;
    title: string;
    description: string;
    date: string; // YYYY-MM-DD
    videoId: string; // YouTube Video ID
    source: 'YouTube';
  };
  
  export const sringeriVideoArchive: VideoArchiveItem[] = [
    {
      id: 'vyc-2024-07-20',
      title: 'Jagadgurus' Anugraha Bhashanam on Vyasa Puja',
      description: 'The sacred address delivered by Jagadguru Sri Sri Bharati Tirtha Mahaswamiji and Jagadguru Sri Sri Vidhushekhara Bharati Mahaswamiji on the holy occasion of Guru Purnima / Vyasa Puja.',
      date: '2024-07-20',
      videoId: 'YOUR_YOUTUBE_VIDEO_ID_1', // Placeholder
      source: 'YouTube',
    },
    {
      id: 'spc-2024-05-12',
      title: 'Sri Shankara Pancharatna Stotram by Sringeri Sisters',
      description: 'A melodious rendering of the Sri Shankara Pancharatna Stotram by the renowned Sringeri Sisters, offered at the lotus feet of the Acharya on Shankara Jayanti.',
      date: '2024-05-12',
      videoId: 'YOUR_YOUTUBE_VIDEO_ID_2', // Placeholder
      source: 'YouTube',
    },
    {
      id: 'ard-2024-04-18',
      title: 'Aradhana Day Discourse',
      description: 'A special discourse given by the Jagadguru on the 31st Aradhana of Jagadguru Sri Sri Abhinava Vidyatirtha Mahaswamiji, the 35th Acharya of the Peetham.',
      date: '2024-04-18',
      videoId: 'YOUR_YOUTUBE_VIDEO_ID_3', // Placeholder
      source: 'YouTube',
    },
  ];
  
  export const sringeriPhotoGallery = [
    { id: 1, alt: 'Jagadguru blessing devotees', src: 'https://source.unsplash.com/random/400x300/?spiritual,leader', aiHint: 'spiritual leader' },
    { id: 2, alt: 'Vidyasankara Temple architecture', src: 'https://source.unsplash.com/random/400x300/?indian,temple,architecture', aiHint: 'temple architecture' },
    { id: 3, alt: 'Puja ceremony at the main shrine', src: 'https://source.unsplash.com/random/400x300/?religious,ceremony', aiHint: 'religious ceremony' },
    { id: 4, alt: 'Crowd of devotees during a festival', src: 'https://source.unsplash.com/random/400x300/?devotees,crowd', aiHint: 'devotees crowd' },
  ];
  