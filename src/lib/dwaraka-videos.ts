
import dwarakaVideoData from './dwaraka-videos.json';

export type VideoItem = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    url: string; // Direct embed link
    description: string;
    thumbnailUrl: string;
};

export const dwarakaVideos: VideoItem[] = [];
