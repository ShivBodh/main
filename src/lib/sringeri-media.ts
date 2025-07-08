
import sringeriPhotoData from './sringeri-media.json';

type PhotoGalleryItem = {
    id: string;
    date: string;
    title: string;
    description: string;
    imageUrl: string;
    thumbnailUrl: string;
    aiHint: string;
};

export const sringeriPhotoGallery: PhotoGalleryItem[] = [];
