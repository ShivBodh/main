
import type { Peetham } from './events-data';

// Keep this file for type definitions, but the data will now be fetched from Firestore.

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
    aiHint?: string;
}

export type UnifiedCalendarItem = CalendarEventItem | CalendarPhotoItem | CalendarVideoItem;

    
