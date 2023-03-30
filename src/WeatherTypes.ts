export interface CurrentWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  rain?: { '3h'?: number; '1h'?: number };
  snow?: { '3h'?: number; '1h'?: number };
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type City = {
  coord: {
    lat: number;
    lon: number;
  };
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
};
export type FiveDaysWeatherElement = {
  weather: Weather[];
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  dt_txt: string;
  sys: { pod: string };
  pop: number;
  rain?: { '3h'?: number; '1h'?: number };
  snow?: { '3h'?: number; '1h'?: number };
};

export interface FiveDaysWeather {
  city: City;
  cnt: number;
  cod: string;
  list: FiveDaysWeatherElement[];
}
