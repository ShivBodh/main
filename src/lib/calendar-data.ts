
import type { Peetham } from './events-data';
import { allEvents } from './events-data';

import { sringeriPhotoGallery } from './sringeri-media';
import { dwarakaPhotoGallery } from './dwaraka-media';
import { puriPhotoGallery } from './puri-media';
import { jyotirmathPhotoGallery } from './jyotirmath-media';

import { sringeriVideos } from './sringeri-videos';
import { dwarakaVideos } from './dwaraka-videos';
import { puriVideos } from './puri-videos';
import { jyotirmathVideos } from './jyotirmath-videos';

// Define the unified types
export type CalendarItemType = 'event' | 'photo' | 'video';

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
    thumbnailUrl: string;
    aiHint: string;
}

export interface CalendarVideoItem extends BaseCalendarItem {
    type: 'video';
    url: string;
    thumbnailUrl: string;
}

export type UnifiedCalendarItem = CalendarEventItem | CalendarPhotoItem | CalendarVideoItem;

// Transform the data
const eventItems: CalendarEventItem[] = allEvents.map(e => ({
    ...e,
    id: `event-${e.id}`,
    type: 'event',
}));

const photoItems: CalendarPhotoItem[] = [
    ...sringeriPhotoGallery.map(p => ({ ...p, peetham: 'Sringeri' as const, type: 'photo' as const })),
    ...dwarakaPhotoGallery.map(p => ({ ...p, peetham: 'Dwaraka' as const, type: 'photo' as const })),
    ...puriPhotoGallery.map(p => ({ ...p, peetham: 'Puri' as const, type: 'photo' as const })),
    ...jyotirmathPhotoGallery.map(p => ({ ...p, peetham: 'Jyotirmath' as const, type: 'photo' as const })),
];

const videoItems: CalendarVideoItem[] = [
    ...sringeriVideos.map(v => ({ ...v, peetham: 'Sringeri' as const, type: 'video' as const })),
    ...dwarakaVideos.map(v => ({ ...v, peetham: 'Dwaraka' as const, type: 'video' as const })),
    ...puriVideos.map(v => ({ ...v, peetham: 'Puri' as const, type: 'video' as const })),
    ...jyotirmathVideos.map(v => ({ ...v, peetham: 'Jyotirmath' as const, type: 'video' as const })),
];

export const allCalendarItems: UnifiedCalendarItem[] = [
    ...eventItems,
    ...photoItems,
    ...videoItems,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
