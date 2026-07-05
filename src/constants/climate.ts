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

export const HUBS: Array<{ id: string; city: string; tagline: string; climate: ClimateState }> = [
  {
    id: "manila",
    city: "Manila",
    tagline: "Tropical Humid",
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
