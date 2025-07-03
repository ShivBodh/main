
import type { Peetham } from './events-data';
import { allEvents } from './events-data';

import { sringeriPhotoGallery } from './sringeri-media';
import { dwarakaPhotoGallery } from './dwaraka-media';
import { puriPhotoGallery } from './puri-media';
import { jyotirmathPhotoGallery } from './jyotirmath-media';

// Define the unified types
export type CalendarItemType = 'event' | 'photo';

export interface BaseCalendarItem {
    id: string;
    date: string; // YYYY-MM-DD
    peetham: Peetham;
    type: CalendarItemType;
    title: string;
    description: string;
}

export interface CalendarEventItem extends BaseCalendarItem {
    type: 'event';
    category: string;
    story?: string;
    references?: string[];
}

export interface CalendarPhotoItem extends BaseCalendarItem {
    type: 'photo';
    imageUrl: string;
    thumbnailUrl?: string; // For fast-loading gallery thumbnails
    aiHint: string;
}

export type UnifiedCalendarItem = CalendarEventItem | CalendarPhotoItem;

// Transform the data
const eventItems: CalendarEventItem[] = allEvents.map(e => ({
    ...e,
    id: `event-${e.id}`,
    type: 'event',
}));

const photoItems: CalendarPhotoItem[] = [
    ...sringeriPhotoGallery.map(p => ({
        id: p.id,
        date: p.date,
        peetham: 'Sringeri' as const,
        type: 'photo' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.imageUrl,
        thumbnailUrl: p.thumbnailUrl,
        aiHint: p.aiHint,
    })),
    ...dwarakaPhotoGallery.map(p => ({
        id: p.id,
        date: p.date,
        peetham: 'Dwaraka' as const,
        type: 'photo' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.imageUrl,
        thumbnailUrl: p.thumbnailUrl,
        aiHint: p.aiHint,
    })),
    ...puriPhotoGallery.map(p => ({
        id: p.id,
        date: p.date,
        peetham: 'Puri' as const,
        type: 'photo' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.imageUrl,
        thumbnailUrl: p.thumbnailUrl,
        aiHint: p.aiHint,
    })),
    ...jyotirmathPhotoGallery.map(p => ({
        id: p.id,
        date: p.date,
        peetham: 'Jyotirmath' as const,
        type: 'photo' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.imageUrl,
        thumbnailUrl: p.thumbnailUrl,
        aiHint: p.aiHint,
    })),
];


export const allCalendarItems: UnifiedCalendarItem[] = [
    ...eventItems,
    ...photoItems,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
