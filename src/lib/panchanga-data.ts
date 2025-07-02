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

// Placeholder data for today
export const panchangaData: Panchanga[] = [
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
