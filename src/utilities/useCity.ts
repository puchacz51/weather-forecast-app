import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { City, CityApiResponse } from './type';

const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_GEO_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

const getCity = async (prefix: string) => {
  const params = { params: { namePrefix: prefix } };
  const result = await axios.request<CityApiResponse>({
    ...options,
    ...params,
  });
  return result.data.data;
};
export const useCity = (prefix: string, options: UseQueryOptions<City[]>) => {
  const prefixCity = prefix.toLowerCase();
  return useQuery<City[]>([prefix], async () => getCity(prefixCity), options);
};
