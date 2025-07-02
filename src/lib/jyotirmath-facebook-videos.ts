
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
    }
];
