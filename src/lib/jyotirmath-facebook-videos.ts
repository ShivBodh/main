
export type FacebookVideo = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    url: string; // Direct link to the Facebook video
    description: string;
    thumbnailUrl: string;
};

const publicPlaceholderUrl = 'https://www.facebook.com/nasa/videos/1033237274794883/';

export const jyotirmathFacebookVideos: FacebookVideo[] = [
    {
        id: 'fb-video-1',
        title: 'Live Aarti from Jyotirmath',
        date: '2024-07-22',
        url: publicPlaceholderUrl,
        description: 'Join the serene morning aarti live from the Jyotirmath Peetham in the Himalayas.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-2',
        title: 'Discourse on the Atharva Veda',
        date: '2024-07-18',
        url: publicPlaceholderUrl,
        description: 'An insightful discourse on the practical wisdom contained within the Atharva Veda.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-3',
        title: 'Badrinath Temple Darshan',
        date: '2024-07-10',
        url: publicPlaceholderUrl,
        description: 'Virtual darshan of the sacred Badrinath Temple, the holy abode of Lord Vishnu.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-4',
        title: 'Message for Diwali 2023',
        date: '2023-11-12',
        url: publicPlaceholderUrl,
        description: 'An archival message from the Shankaracharya on the festival of lights, Diwali 2023.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-jyotirmath-2019',
        title: 'Ganga Dussehra Message 2019',
        date: '2019-06-12',
        url: publicPlaceholderUrl,
        description: 'A message on the occasion of Ganga Dussehra from 2019.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-5',
        title: 'Glimpses of the Himalayas (2022)',
        date: '2022-08-15',
        url: publicPlaceholderUrl,
        description: 'A video from the archives showcasing the stunning natural beauty around Jyotirmath.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-6',
        title: 'Archive: Message from 2017',
        date: '2017-01-01',
        url: publicPlaceholderUrl,
        description: 'A new year message to devotees from the archives of 2017.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-jyotirmath-2015',
        title: 'Badrinath Opening 2015',
        date: '2015-04-26',
        url: publicPlaceholderUrl,
        description: 'Archival footage from the Badrinath temple opening in 2015.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-7',
        title: 'Badrinath Opening Ceremony 2014',
        date: '2014-05-05',
        url: publicPlaceholderUrl,
        description: 'Rare footage from the temple opening ceremony in 2014.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-jyotirmath-2012',
        title: 'Discourse from 2012',
        date: '2012-07-20',
        url: publicPlaceholderUrl,
        description: 'An old discourse on Vedanta from the summer of 2012.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    }
];
