
export type FacebookVideo = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    url: string; // Direct link to the Facebook video
    description: string;
    thumbnailUrl: string;
};

export const sringeriFacebookVideos: FacebookVideo[] = [
    {
        id: 'fb-video-1',
        title: 'Live: Evening Puja at Sringeri',
        date: '2024-07-22',
        url: 'https://www.facebook.com/sringerimath/videos/1182398276288271/',
        description: 'Watch the live stream of the evening puja and connect with the spiritual vibrations of Sringeri.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-2',
        title: 'Special Discourse on Guru Purnima',
        date: '2024-07-21',
        url: 'https://www.facebook.com/sringerimath/videos/1429876294333912/',
        description: 'A special discourse by the Jagadguru on the auspicious occasion of Guru Purnima.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    },
    {
        id: 'fb-video-3',
        title: 'Highlights of the Annual Rathotsava',
        date: '2024-07-15',
        url: 'https://www.facebook.com/sringerimath/videos/1118712312563454/',
        description: 'Experience the grandeur of the annual Rathotsava (chariot festival) at Sringeri.',
        thumbnailUrl: 'https://placehold.co/1280x720.png',
    }
];
