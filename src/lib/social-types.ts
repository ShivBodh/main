
// --- TYPES ---
export interface Post {
    id: string;
    author: { name: string; handle: string; avatar?: string; };
    content: string;
    image: string | null;
    aiHint?: string;
    likes: number;
    comments: number;
    isPublic: boolean;
    timestamp: Date;
}
export interface Mitra {
    name: string;
    handle: string;
    avatar?: string;
}
export interface Notification {
    id: string;
    type: 'mitra_request' | 'campaign_support' | 'post_like';
    actor: { name: string; avatar?: string; };
    message: string;
    timestamp: Date;
    isRead: boolean;
}
export interface Campaign {
    id: string;
    author: { name: string; handle: string; avatar?: string; };
    title: string;
    description: string;
    image: string | null;
    aiHint?: string;
    supporters: number;
    greenFlags: number;
    redFlags: number;
    isPublic: boolean;
    timestamp: Date;
    userHasSupported?: boolean;
    userFlagged?: 'green' | 'red' | null;
}
export interface Task { id: string; text: string; completed: boolean; }
export interface DayEntry { notes: string; tasks: Task[]; sketchData?: string; }
