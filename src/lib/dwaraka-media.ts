
import dwarakaPhotoData from './dwaraka-media.json';

type PhotoGalleryItem = {
    id: string;
    date: string;
    title: string;
    description: string;
    imageUrl: string;
    thumbnailUrl: string;
    aiHint: string;
};

export const dwarakaPhotoGallery: PhotoGalleryItem[] = dwarakaPhotoData;
