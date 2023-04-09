export interface Weather {
  icon: string;
  code: number;
  description: string;
}

export interface WeatherData {
  app_max_temp: number;
  app_min_temp: number;
  clouds: number;
  clouds_hi: number;
  clouds_low: number;
  clouds_mid: number;
  datetime: Date;
  dewpt: number;
  high_temp: number;
  low_temp: number;
  max_dhi: null;
  max_temp: number;
  min_temp: number;
  moon_phase: number;
  moon_phase_lunation: number;
  moonrise_ts: number;
  moonset_ts: number;
  ozone: number;
  pop: number;
  precip: number;
  pres: number;
  rh: number;
  slp: number;
  snow: number;
  snow_depth: number;
  sunrise_ts: number;
  sunset_ts: number;
  temp: number;
  ts: number;
  uv: number;
  valid_date: Date;
  vis: number;
  weather: Weather;
  wind_cdir: string;
  wind_cdir_full: string;
  wind_dir: number;
  wind_gust_spd: number;
  wind_spd: number;
}

export type WeatherArray = Array<WeatherData>;
export interface WeatherObjectResult {
  city_name: string;
  country_code: string;
  data: WeatherArray;
  lat: number;
  lot: number;
  status_code: string;
  timezone: string;
}

interface City {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: number;
  longitude: number;
  population: number;
}

interface CitiesApiResponse {
  data: City[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}

interface CityApiResponse {
  data: City;
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}

export type { CitiesApiResponse, City, CityApiResponse };
