export type ClimateIcon = "sun" | "cloud" | "rain" | "snow" | "wind";
export type ClimateCondition = "Sunny" | "Cloudy" | "Overcast" | "Rain" | "Snow" | "Windy";

export interface ClimateState {
  label: string;
  location: string;
  icon: ClimateIcon;
  tempF: number;
  tempC: number;
  condition: ClimateCondition;
}

export const DEFAULT_HUB_STORAGE_KEY = "mila.default-hub";

// `climate` is the offline/loading fallback; live data is fetched from Open-Meteo via lat/lon.
export const HUBS: Array<{
  id: string;
  city: string;
  tagline: string;
  lat: number;
  lon: number;
  climate: ClimateState;
}> = [
  {
    id: "manila",
    city: "Manila",
    tagline: "Tropical Humid",
    lat: 14.6,
    lon: 120.98,
    climate: {
      label: "32°C Humid Afternoon, tropical sun",
      location: "Manila",
      icon: "sun",
      tempC: 32,
      tempF: 90,
      condition: "Sunny",
    },
  },
  {
    id: "singapore",
    city: "Singapore",
    tagline: "Equatorial Humid",
    lat: 1.35,
    lon: 103.82,
    climate: {
      label: "31°C Hot & Humid, equatorial",
      location: "Singapore",
      icon: "sun",
      tempC: 31,
      tempF: 88,
      condition: "Sunny",
    },
  },
  {
    id: "dubai",
    city: "Dubai",
    tagline: "Arid Heat",
    lat: 25.2,
    lon: 55.27,
    climate: {
      label: "38°C Arid Dry Heat, desert sun",
      location: "Dubai",
      icon: "sun",
      tempC: 38,
      tempF: 100,
      condition: "Sunny",
    },
  },
  {
    id: "la",
    city: "Los Angeles",
    tagline: "Warm & Dry",
    lat: 34.05,
    lon: -118.24,
    climate: {
      label: "26°C Warm & Dry, light breeze",
      location: "Los Angeles",
      icon: "sun",
      tempC: 26,
      tempF: 79,
      condition: "Sunny",
    },
  },
  {
    id: "seoul",
    city: "Seoul",
    tagline: "Crisp Spring",
    lat: 37.57,
    lon: 126.98,
    climate: {
      label: "17°C Cool & Overcast",
      location: "Seoul",
      icon: "cloud",
      tempC: 17,
      tempF: 62,
      condition: "Overcast",
    },
  },
  {
    id: "tokyo",
    city: "Tokyo",
    tagline: "Mild Overcast",
    lat: 35.68,
    lon: 139.69,
    climate: {
      label: "18°C Mild Overcast",
      location: "Tokyo",
      icon: "cloud",
      tempC: 18,
      tempF: 64,
      condition: "Overcast",
    },
  },
  {
    id: "paris",
    city: "Paris",
    tagline: "Cool Drizzle",
    lat: 48.86,
    lon: 2.35,
    climate: {
      label: "13°C Cool & Drizzly",
      location: "Paris",
      icon: "rain",
      tempC: 13,
      tempF: 55,
      condition: "Rain",
    },
  },
  {
    id: "london",
    city: "London",
    tagline: "Overcast Chill",
    lat: 51.51,
    lon: -0.13,
    climate: {
      label: "11°C Overcast & Damp",
      location: "London",
      icon: "rain",
      tempC: 11,
      tempF: 52,
      condition: "Rain",
    },
  },
  {
    id: "nyc",
    city: "New York",
    tagline: "Brisk Autumn",
    lat: 40.71,
    lon: -74.01,
    climate: {
      label: "10°C Brisk & Windy",
      location: "New York",
      icon: "wind",
      tempC: 10,
      tempF: 50,
      condition: "Windy",
    },
  },
  {
    id: "stockholm",
    city: "Stockholm",
    tagline: "Frost & Snow",
    lat: 59.33,
    lon: 18.07,
    climate: {
      label: "-2°C Frosty with light snow",
      location: "Stockholm",
      icon: "snow",
      tempC: -2,
      tempF: 28,
      condition: "Snow",
    },
  },
];
