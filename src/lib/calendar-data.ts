
import type { Peetham } from './events-data';
import { allEvents } from './events-data';

import { sringeriVideoArchive } from './sringeri-media';
import { sringeriFacebookVideos } from './sringeri-facebook-videos';

import { dwarakaVideoArchive } from './dwaraka-media';
import { dwarakaFacebookVideos } from './dwaraka-facebook-videos';

import { puriVideoArchive } from './puri-media';
import { puriFacebookVideos } from './puri-facebook-videos';

import { jyotirmathVideoArchive } from './jyotirmath-media';
import { jyotirmathFacebookVideos } from './jyotirmath-facebook-videos';

// Define the unified types
export type CalendarItemType = 'event' | 'youtube' | 'facebook';

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

export type UnifiedCalendarItem = CalendarEventItem | CalendarYouTubeItem | CalendarFacebookItem;

// Transform the data
const eventItems: CalendarEventItem[] = allEvents.map(e => ({
    ...e,
    id: `event-${e.id}`,
    type: 'event',
}));

const youtubeItems: CalendarYouTubeItem[] = [
    ...sringeriVideoArchive.map(v => ({...v, peetham: 'Sringeri' as const, type: 'youtube' as const })),
    ...dwarakaVideoArchive.map(v => ({...v, peetham: 'Dwaraka' as const, type: 'youtube' as const })),
    ...puriVideoArchive.map(v => ({...v, peetham: 'Puri' as const, type: 'youtube' as const })),
    ...jyotirmathVideoArchive.map(v => ({...v, peetham: 'Jyotirmath' as const, type: 'youtube' as const })),
];

const facebookItems: CalendarFacebookItem[] = [
    ...sringeriFacebookVideos.map(v => ({ ...v, peetham: 'Sringeri' as const, type: 'facebook' as const })),
    ...dwarakaFacebookVideos.map(v => ({ ...v, peetham: 'Dwaraka' as const, type: 'facebook' as const })),
    ...puriFacebookVideos.map(v => ({ ...v, peetham: 'Puri' as const, type: 'facebook' as const })),
    ...jyotirmathFacebookVideos.map(v => ({ ...v, peetham: 'Jyotirmath' as const, type: 'facebook' as const })),
];


export const allCalendarItems: UnifiedCalendarItem[] = [
    ...eventItems,
    ...youtubeItems,
    ...facebookItems,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
