import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { supabase } from './supabase/supabase';
import { log } from 'console';

export type WeatherCardCity = {
  cityName: string;
  longitude: number;
  latitude: number;
  order: number;
  userId: string;
  cityId: number;
};

const fetchUserWeatherCards = async (userId: string) => {
  const response = await supabase
    .from('weatherCard')
    .select('*')
    .eq('userId', userId);
  return response.data;
};
export const useUserWeatherCardQuery = (
  userId: string,
  options?: UseQueryOptions<WeatherCardCity[]>
) =>
  useQuery<WeatherCardCity[] | null>([userId, 'weatherCards'], async () =>
    fetchUserWeatherCards(userId)
  );
export const useAddUserWeatherCard = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newWeatherCard: WeatherCardCity) =>
      supabase.from('weatherCard').insert(newWeatherCard),
    {
      onMutate: (newCard) => {
        queryClient.setQueryData<WeatherCardCity[]>(
          [userId, 'weatherCards'],
          (oldState) => {
            if (oldState?.length) {
              return [...oldState, { ...newCard, tempCard: true }];
            }
            return [newCard];
          }
        );
      },
      onError(error, newCard, context) {
        queryClient.setQueryData<WeatherCardCity[]>(
          [userId, 'weatherCards'],
          (oldState) => {
            return oldState?.filter(
              (weatherCard) => weatherCard.cityId !== newCard.cityId
            );
          }
        );
      },
      onSuccess(data, newCard, context) {
        queryClient.setQueryData<WeatherCardCity[]>(
          [userId, 'weatherCards'],
          (oldState) => {
            return oldState?.map((weatherCard) =>
              weatherCard.cityId !== newCard.cityId ? weatherCard : newCard
            );
          }
        );
      },
    }
  );
};
