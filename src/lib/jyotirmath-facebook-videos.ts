
export type FacebookVideo = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    url: string; // Direct link to the Facebook video
    description: string;
    thumbnailUrl: string;
};

export const jyotirmathFacebookVideos: FacebookVideo[] = [];
