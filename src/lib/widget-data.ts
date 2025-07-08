
export interface WidgetStyle {
  name: string;
  bgClass: string;
  textColor?: string;
  patternUrl?: string;
  details: ('Tithi' | 'Nakshatra' | 'Yoga' | 'Sunrise' | 'Sunset')[];
}

export const widgetStyles: WidgetStyle[] = [
  {
    name: 'Vintage Scroll',
    bgClass: 'bg-gradient-to-br from-yellow-800 via-amber-700 to-yellow-900',
    patternUrl: 'https://www.transparenttextures.com/patterns/old-paper.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Digital Squircle',
    bgClass: 'bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-800',
    patternUrl: 'https://www.transparenttextures.com/patterns/stardust.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Living Ember',
    bgClass: 'bg-gradient-to-bl from-red-600 via-orange-500 to-yellow-600',
    patternUrl: 'https://www.transparenttextures.com/patterns/gplay.png',
    details: ['Tithi', 'Nakshatra', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Temple Calendar',
    bgClass: 'bg-gradient-to-b from-stone-100 to-stone-200',
    textColor: 'text-stone-800',
    patternUrl: 'https://www.transparenttextures.com/patterns/concrete-wall-2.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise'],
  },
  {
    name: 'Celestial Dial',
    bgClass: 'bg-gradient-to-br from-gray-900 via-purple-950 to-black',
    patternUrl: 'https://www.transparenttextures.com/patterns/stardust.png',
    details: ['Tithi', 'Nakshatra', 'Sunrise', 'Sunset'],
  }
];
