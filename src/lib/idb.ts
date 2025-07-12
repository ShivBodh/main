
'use client';

const DB_NAME = 'AiImageCacheDB';
const STORE_NAME = 'imageCache';
const DB_VERSION = 1;

interface CachedImage {
  id: string;
  url: string;
  timestamp: number;
}

let db: IDBDatabase | null = null;

function getDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', request.error);
      reject('IndexedDB error');
    };

    request.onsuccess = (event) => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export async function getCachedImage(id: string): Promise<CachedImage | null> {
    const db = await getDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result || null);
        };

        request.onerror = () => {
            console.error('Error fetching from IndexedDB:', request.error);
            reject(request.error);
        };
    });
}

export async function setCachedImage(id: string, url: string): Promise<void> {
    const db = await getDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const item: CachedImage = { id, url, timestamp: Date.now() };

        const request = store.put(item);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            console.error('Error saving to IndexedDB:', request.error);
            reject(request.error);
        };
    });
}
