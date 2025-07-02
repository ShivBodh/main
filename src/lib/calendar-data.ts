
import type { Peetham } from './events-data';
import { allEvents } from './events-data';

import { sringeriVideoArchive, sringeriPhotoGallery } from './sringeri-media';
import { sringeriFacebookVideos } from './sringeri-facebook-videos';

import { dwarakaVideoArchive, dwarakaPhotoGallery } from './dwaraka-media';
import { dwarakaFacebookVideos } from './dwaraka-facebook-videos';

import { puriVideoArchive, puriPhotoGallery } from './puri-media';
import { puriFacebookVideos } from './puri-facebook-videos';

import { jyotirmathVideoArchive, jyotirmathPhotoGallery } from './jyotirmath-media';
import { jyotirmathFacebookVideos } from './jyotirmath-facebook-videos';

// Define the unified types
export type CalendarItemType = 'event' | 'youtube' | 'facebook' | 'photo';

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

export interface CalendarYouTubeItem extends BaseCalendarItem {
    type: 'youtube';
    videoId: string;
}

export interface CalendarFacebookItem extends BaseCalendarItem {
    type: 'facebook';
    url: string;
}

export interface CalendarPhotoItem extends BaseCalendarItem {
    type: 'photo';
    imageUrl: string;
    aiHint: string;
}

export type UnifiedCalendarItem = CalendarEventItem | CalendarYouTubeItem | CalendarFacebookItem | CalendarPhotoItem;

// Transform the data
const eventItems: CalendarEventItem[] = allEvents.map(e => ({
    ...e,
    id: `event-${e.id}`,
    type: 'event',
}));

const youtubeItems: CalendarYouTubeItem[] = [
    ...sringeriVideoArchive.map(v => ({...v, id: `sringeri-yt-${v.id}`, peetham: 'Sringeri' as const, type: 'youtube' as const })),
    ...dwarakaVideoArchive.map(v => ({...v, id: `dwaraka-yt-${v.id}`, peetham: 'Dwaraka' as const, type: 'youtube' as const })),
    ...puriVideoArchive.map(v => ({...v, id: `puri-yt-${v.id}`, peetham: 'Puri' as const, type: 'youtube' as const })),
    ...jyotirmathVideoArchive.map(v => ({...v, id: `jyotirmath-yt-${v.id}`, peetham: 'Jyotirmath' as const, type: 'youtube' as const })),
];

const facebookItems: CalendarFacebookItem[] = [
    ...sringeriFacebookVideos.map(v => ({ ...v, id: `sringeri-${v.id}`, peetham: 'Sringeri' as const, type: 'facebook' as const })),
    ...dwarakaFacebookVideos.map(v => ({ ...v, id: `dwaraka-${v.id}`, peetham: 'Dwaraka' as const, type: 'facebook' as const })),
    ...puriFacebookVideos.map(v => ({ ...v, id: `puri-${v.id}`, peetham: 'Puri' as const, type: 'facebook' as const })),
    ...jyotirmathFacebookVideos.map(v => ({ ...v, id: `jyotirmath-${v.id}`, peetham: 'Jyotirmath' as const, type: 'facebook' as const })),
];

const photoItems: CalendarPhotoItem[] = [
    ...sringeriPhotoGallery.map(p => ({
        id: `sringeri-photo-${p.id}`,
        date: p.date,
        peetham: 'Sringeri' as const,
        type: 'photo' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.src,
        aiHint: p.aiHint,
    })),
    ...dwarakaPhotoGallery.map(p => ({
        id: `dwaraka-photo-${p.id}`,
        date: p.date,
        peetham: 'Dwaraka' as const,
        type: 'photo' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.src,
        aiHint: p.aiHint,
    })),
    ...puriPhotoGallery.map(p => ({
        id: `puri-photo-${p.id}`,
        date: p.date,
        peetham: 'Puri' as const,
        type: 'photo' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.src,
        aiHint: p.aiHint,
    })),
    ...jyotirmathPhotoGallery.map(p => ({
        id: `jyotirmath-photo-${p.id}`,
        date: p.date,
        peetham: 'Jyotirmath' as const,
        type: 'photo' as const,
        title: p.title,
        description: p.description,
        imageUrl: p.src,
        aiHint: p.aiHint,
    })),
];


export const allCalendarItems: UnifiedCalendarItem[] = [
    ...eventItems,
    ...youtubeItems,
    ...facebookItems,
    ...photoItems,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
