
import jyotirmathPhotoData from './jyotirmath-media.json';

type PhotoGalleryItem = {
    id: string;
    date: string;
    title: string;
    description: string;
    imageUrl: string;
    thumbnailUrl: string;
    aiHint: string;
};

export const jyotirmathPhotoGallery: PhotoGalleryItem[] = jyotirmathPhotoData;
