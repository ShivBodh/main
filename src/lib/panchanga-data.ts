export type PanchangaRegion = 'South' | 'West' | 'East' | 'North';

export type PanchangaDetails = {
  sunrise: string;
  sunset: string;
  tithi: { name: string; endTime: string };
  nakshatra: { name: string; endTime: string };
  yoga: { name: string; endTime: string };
  karana: { name: string; endTime: string };
  rahuKalam: string;
  gulikaKalam: string;
  yamagandaKalam: string;
};

export type Panchanga = {
  region: PanchangaRegion;
  peetham: string;
  data: PanchangaDetails;
};

// Base data for sunrise/sunset and timings which are region-specific
const basePanchangaData: Panchanga[] = [
  {
    region: 'South',
    peetham: 'Sringeri',
    data: {
      sunrise: '06:05 AM',
      sunset: '06:35 PM',
      tithi: { name: 'Dashami', endTime: '08:45 PM' },
      nakshatra: { name: 'Anuradha', endTime: '10:00 PM' },
      yoga: { name: 'Vishkambha', endTime: '01:20 PM' },
      karana: { name: 'Vanija', endTime: '09:30 AM' },
      rahuKalam: '07:30 AM - 09:00 AM',
      gulikaKalam: '01:30 PM - 03:00 PM',
      yamagandaKalam: '10:30 AM - 12:00 PM',
    },
  },
  {
    region: 'West',
    peetham: 'Dwaraka',
    data: {
      sunrise: '06:15 AM',
      sunset: '07:05 PM',
      tithi: { name: 'Dashami', endTime: '09:00 PM' },
      nakshatra: { name: 'Jyeshtha', endTime: '10:15 PM' },
      yoga: { name: 'Priti', endTime: '01:50 PM' },
      karana: { name: 'Bava', endTime: '09:45 AM' },
      rahuKalam: '07:40 AM - 09:10 AM',
      gulikaKalam: '01:40 PM - 03:10 PM',
      yamagandaKalam: '10:40 AM - 12:10 PM',
    },
  },
  {
    region: 'East',
    peetham: 'Puri',
    data: {
      sunrise: '05:45 AM',
      sunset: '06:10 PM',
      tithi: { name: 'Ekadashi', endTime: '08:30 PM' },
      nakshatra: { name: 'Mula', endTime: '09:50 PM' },
      yoga: { name: 'Ayushman', endTime: '01:00 PM' },
      karana: { name: 'Balava', endTime: '09:15 AM' },
      rahuKalam: '07:15 AM - 08:45 AM',
      gulikaKalam: '01:15 PM - 02:45 PM',
      yamagandaKalam: '10:15 AM - 11:45 AM',
    },
  },
  {
    region: 'North',
    peetham: 'Jyotirmath',
    data: {
      sunrise: '05:55 AM',
      sunset: '06:45 PM',
      tithi: { name: 'Ekadashi', endTime: '08:55 PM' },
      nakshatra: { name: 'Purva Ashadha', endTime: '10:30 PM' },
      yoga: { name: 'Saubhagya', endTime: '01:35 PM' },
      karana: { name: 'Kaulava', endTime: '09:35 AM' },
      rahuKalam: '07:25 AM - 08:55 AM',
      gulikaKalam: '01:25 PM - 02:55 PM',
      yamagandaKalam: '10:25 AM - 11:55 AM',
    },
  },
];

// Expanded lists for dynamic generation
const allTithis = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];
const allNakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];
const allYogas = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarman', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
];
const allKaranas = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Visti (Bhadra)', 'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'
];

/**
 * Simulates fetching Panchanga data for a specific date and region.
 * In a real application, this would involve complex astrological calculations or an API call.
 * @param date The selected Gregorian date.
 * @param region The geographical region.
 * @returns A complete Panchanga object for that day.
 */
export function getDailyPanchanga(date: Date, region: PanchangaRegion): Panchanga {
    const day = date.getDate(); // 1-31
    const basePanchanga = basePanchangaData.find(p => p.region === region)!;
    
    // Simple modulo arithmetic to simulate dynamic data based on the day of the month
    const tithiName = allTithis[(day - 1) % 30];
    const nakshatraName = allNakshatras[(day - 1) % 27];
    const yogaName = allYogas[(day - 1) % 27];
    const karanaName = allKaranas[Math.floor(((day - 1) * 2)) % 11];

    const paksha = (day <= 15) ? 'Shukla Paksha' : 'Krishna Paksha';

    const dynamicData: PanchangaDetails = {
      ...basePanchanga.data,
      tithi: { name: `${tithiName} (${paksha})`, endTime: '08:45 PM' },
      nakshatra: { name: nakshatraName, endTime: '10:00 PM' },
      yoga: { name: yogaName, endTime: '01:20 PM' },
      karana: { name: karanaName, endTime: '09:30 AM' },
    };

    return {
        ...basePanchanga,
        data: dynamicData
    };
}
