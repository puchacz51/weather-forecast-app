import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { CitiesApiResponse, City, CityApiResponse } from './type';
import { number } from 'zod';
const header = {
  'X-RapidAPI-Key': process.env.REACT_APP_GEO_API_KEY,
  'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
};

const getCities = async (prefix: string) => {
  const params = {
    params: {
      namePrefix: prefix,
      types: 'CITY',
      SORT_FIELD: '-population',
      LIMIT: 20,
    },
  };
  const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    headers: header,
  };
  const result = await axios.request<CitiesApiResponse>({
    ...options,
    ...params,
  });
  return result.data.data;
};
const getCityById = async (cityId: string) => {
  const params = {
    params: {
      countryIds: cityId,

      types: 'CITY',
    },
  };
  const options = {
    method: 'GET',
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
    headers: header,
  };

  const result = await axios.request<CityApiResponse>({
    ...options,
    ...params,
  });
  return result.data.data;
};

const getCityByCords = async (lon: number, lat: number) => {
  const params = {
    params: {
      radius: 100,
      types: 'CITY',
      SORT_FIELD: '-population',
    },
  };
  const latParams = `${lat > 0 ? '+' : '-'}${lat.toFixed(5)}`;
  const lonParams = `${lon > 0 ? '+' : '-'}${lon.toFixed(5)}`;
  const options = {
    method: 'GET',
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latParams}${lonParams}/nearbyCities`,
    headers: header,
  };
  const result = await axios.request<CitiesApiResponse>({
    ...options,
    ...params,
  });
  return result.data.data;
};

export const useCityQuery = (
  prefix: string,
  options: UseQueryOptions<City[]>
) => {
  const prefixCity = prefix.toLowerCase();
  return useQuery<City[]>([prefix], async () => getCities(prefixCity), options);
};
export const useCityQueryById = (
  cityId: string,
  options: UseQueryOptions<City>
) => useQuery<City>([cityId], async () => getCityById(cityId), options);
export const useCitiesByCoords = (
  gpsParams: GeolocationPosition | null,
  options?: UseQueryOptions<City[]>
) =>
  useQuery<City[]>(
    ['GPS', gpsParams?.coords.latitude, gpsParams?.coords.latitude],

    async () => {
      if (gpsParams === null) throw new Error('gpsLocation is null');
      return getCityByCords(
        gpsParams.coords.longitude,
        gpsParams.coords.latitude
      );
    },
    options
  );
