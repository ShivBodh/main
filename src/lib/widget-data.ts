
export interface WidgetStyle {
  name: string;
  bgClass: string;
  patternUrl?: string;
  details: ('Tithi' | 'Nakshatra' | 'Yoga' | 'Sunrise' | 'Sunset')[];
}

export const widgetStyles: WidgetStyle[] = [
  {
    name: 'Dharma Gold',
    bgClass: 'bg-gradient-to-br from-amber-600 to-yellow-800',
    patternUrl: 'https://www.transparenttextures.com/patterns/az-subtle.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Cosmic Blue',
    bgClass: 'bg-gradient-to-tr from-indigo-800 to-blue-900',
    patternUrl: 'https://www.transparenttextures.com/patterns/stardust.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Sacred Fire',
    bgClass: 'bg-gradient-to-bl from-red-800 via-orange-700 to-red-900',
    patternUrl: 'https://www.transparenttextures.com/patterns/gplay.png',
    details: ['Tithi', 'Nakshatra', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Forest Green',
    bgClass: 'bg-gradient-to-tl from-green-800 to-teal-900',
    patternUrl: 'https://www.transparenttextures.com/patterns/inspiration-geometry.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise'],
  },
  {
    name: 'Celestial Dial',
    bgClass: 'bg-gradient-to-br from-slate-800 via-gray-900 to-black',
    patternUrl: 'https://www.transparenttextures.com/patterns/stardust.png',
    details: ['Tithi', 'Nakshatra', 'Sunrise', 'Sunset'],
  }
];
