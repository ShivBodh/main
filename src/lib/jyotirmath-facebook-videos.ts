
export type FacebookVideo = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    url: string; // Direct link to the Facebook video
    description: string;
    thumbnailUrl: string;
};

export const jyotirmathFacebookVideos: FacebookVideo[] = [
    {
        id: 'fb-video-1',
        title: 'Live Aarti from Jyotirmath',
        date: '2024-07-22',
        url: 'https://www.facebook.com/1008.guru/videos/1135803450997873/', // Example link
        description: 'Join the serene morning aarti live from the Jyotirmath Peetham in the Himalayas.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-2',
        title: 'Discourse on the Atharva Veda',
        date: '2024-07-18',
        url: 'https://www.facebook.com/1008.guru/videos/1135803450997873/', // Example link
        description: 'An insightful discourse on the practical wisdom contained within the Atharva Veda.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-3',
        title: 'Badrinath Temple Darshan',
        date: '2024-07-10',
        url: 'https://www.facebook.com/1008.guru/videos/1135803450997873/', // Example link
        description: 'Virtual darshan of the sacred Badrinath Temple, the holy abode of Lord Vishnu.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-4',
        title: 'Message for Diwali 2023',
        date: '2023-11-12',
        url: 'https://www.facebook.com/1008.guru/videos/1135803450997873/',
        description: 'An archival message from the Shankaracharya on the festival of lights, Diwali 2023.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-5',
        title: 'Glimpses of the Himalayas (2022)',
        date: '2022-08-15',
        url: 'https://www.facebook.com/1008.guru/videos/1135803450997873/',
        description: 'A video from the archives showcasing the stunning natural beauty around Jyotirmath.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-6',
        title: 'Archival Message from 2017',
        date: '2017-01-01',
        url: 'https://www.facebook.com/1008.guru/videos/1135803450997873/',
        description: 'A new year message to devotees from the archives of 2017.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-7',
        title: 'Badrinath Opening Ceremony 2014',
        date: '2014-05-05',
        url: 'https://www.facebook.com/1008.guru/videos/1135803450997873/',
        description: 'Rare footage from the temple opening ceremony in 2014.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    }
];
