
export interface WidgetStyle {
  name: string;
  bgClass: string;
  patternUrl?: string;
  details: ('Tithi' | 'Nakshatra' | 'Yoga' | 'Sunrise' | 'Sunset')[];
}

export const widgetStyles: WidgetStyle[] = [
  {
    name: 'Dharma Gold',
    bgClass: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-700',
    patternUrl: 'https://www.transparenttextures.com/patterns/az-subtle.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Cosmic Blue',
    bgClass: 'bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-800',
    patternUrl: 'https://www.transparenttextures.com/patterns/stardust.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Sacred Fire',
    bgClass: 'bg-gradient-to-bl from-red-500 via-orange-500 to-yellow-400',
    patternUrl: 'https://www.transparenttextures.com/patterns/gplay.png',
    details: ['Tithi', 'Nakshatra', 'Sunrise', 'Sunset'],
  },
  {
    name: 'Forest Green',
    bgClass: 'bg-gradient-to-tl from-emerald-500 via-green-600 to-teal-800',
    patternUrl: 'https://www.transparenttextures.com/patterns/inspiration-geometry.png',
    details: ['Tithi', 'Nakshatra', 'Yoga', 'Sunrise'],
  },
  {
    name: 'Celestial Dial',
    bgClass: 'bg-gradient-to-br from-gray-900 via-purple-950 to-black',
    patternUrl: 'https://www.transparenttextures.com/patterns/stardust.png',
    details: ['Tithi', 'Nakshatra', 'Sunrise', 'Sunset'],
  }
];
