
export type FacebookVideo = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    url: string; // Direct link to the Facebook video
    description: string;
    thumbnailUrl: string;
};

export const puriFacebookVideos: FacebookVideo[] = [
    {
        id: 'fb-video-1',
        title: 'Ratha Yatra Darshan',
        date: '2024-07-07',
        url: 'https://www.facebook.com/watch/live/?ref=watch_permalink&v=1135803450997873', // Example link
        description: 'Experience the divine spectacle of the Ratha Yatra, the grand chariot festival of Lord Jagannath.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-2',
        title: 'Discourse on the Bhagavad Gita',
        date: '2024-07-15',
        url: 'https://www.facebook.com/watch/live/?ref=watch_permalink&v=1135803450997873', // Example link
        description: 'A profound discourse on the timeless wisdom of the Bhagavad Gita by the Shankaracharya.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-3',
        title: 'Evening Aarti at Govardhan Peeth',
        date: '2024-07-22',
        url: 'https://www.facebook.com/watch/live/?ref=watch_permalink&v=1135803450997873', // Example link
        description: 'Join the serene evening aarti live from the Govardhan Peeth in Puri.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-4',
        title: 'Archival: Ratha Yatra 2023 Highlights',
        date: '2023-06-20',
        url: 'https://www.facebook.com/watch/live/?ref=watch_permalink&v=1135803450997873',
        description: 'A look back at the highlights and divine moments from the 2023 Ratha Yatra.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-5',
        title: 'Discourse on Dharma from 2022',
        date: '2022-09-30',
        url: 'https://www.facebook.com/watch/live/?ref=watch_permalink&v=1135803450997873',
        description: 'An important archival discourse on the role of Dharma in society.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-6',
        title: 'Archive: Ratha Yatra 2016',
        date: '2016-07-06',
        url: 'https://www.facebook.com/watch/live/?ref=watch_permalink&v=1135803450997873',
        description: 'Rare footage from the Ratha Yatra festival in 2016.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-7',
        title: 'Archive: Vedanta Sammelan 2012',
        date: '2012-12-22',
        url: 'https://www.facebook.com/watch/live/?ref=watch_permalink&v=1135803450997873',
        description: 'A glimpse into the Vedanta Sammelan held in 2012.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    }
];
