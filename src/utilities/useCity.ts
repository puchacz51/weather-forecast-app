import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { City, CityApiResponse } from './type';

const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  headers: {
    'X-RapidAPI-Key': '290c6e5969msh1d1d0b23988287ap1fa071jsne3c2c553ced1',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

const getCity = async (prefix: string) => {
  const params = { params: { namePrefix: prefix } };

  try {
    const result = await axios.request<CityApiResponse>({
      ...options,
      ...params,
    });
    return result.data.data;
  } catch (err) {
    throw err;
  }
};
export const useCity = (prefix: string, options: UseQueryOptions<City[]>) => {
  const prefixCity = prefix.toLowerCase();
  return useQuery<City[]>([prefix], async () => getCity(prefixCity), options);
};
