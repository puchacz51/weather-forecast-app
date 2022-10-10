export interface Weather {
  icon: string;
  code: number;
  description: string;
}

export interface WeatherData {
  wind_cdir: string;
  rh: number;
  pod: string;
  lon: number;
  pres: number;
  timezone: string;
  ob_time: string;
  country_code: string;
  clouds: number;
  vis: number;
  wind_spd: number;
  gust: number;
  wind_cdir_full: string;
  app_temp: number;
  state_code: string;
  ts: number;
  h_angle: number;
  dewpt: number;
  weather: Weather;
  uv: number;
  aqi: number;
  station: string;
  sources: string[];
  wind_dir: number;
  elev_angle: number;
  datetime: string;
  precip: number;
  ghi: number;
  dni: number;
  dhi: number;
  solar_rad: number;
  city_name: string;
  sunrise: string;
  sunset: string;
  temp: number;
  lat: number;
  slp: number;
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

interface CityApiResponse {
  data: City[];
  metadata: {
    currentOffset: Number;
    totalCount: Number;
  };
}

export type { CityApiResponse, City };
