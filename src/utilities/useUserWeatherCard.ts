import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { supabase } from './supabase/supabase';

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
    .eq('userId', userId)
    .order('order');
  return response.data;
};
export const useUserWeatherCardQuery = (
  userId: string,
  options?: UseQueryOptions<WeatherCardCity[]>
) =>
  useQuery<WeatherCardCity[] | null>(
    [userId, 'weatherCards'],
    async () => fetchUserWeatherCards(userId),
    { cacheTime: 300000, staleTime: 200000 }
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

const checkOrderChange = (
  orginalOrder: WeatherCardCity[],
  newOrder: WeatherCardCity[]
) => {
  const changedElements: WeatherCardCity[] = [];
  orginalOrder.forEach((orginalCard) => {
    const newCard = newOrder.find(
      (newCard) => newCard.cityId === orginalCard.cityId
    );

    if (newCard !== undefined) {
      if (newCard.order !== orginalCard.order) {
        changedElements.push(newCard);
      }
    }
  });

  return changedElements;
};

export const useUpdateWeatherCardOrder = (
  userId: string,
  newWeatherCardOrder: WeatherCardCity[]
) => {
  const queryClient = useQueryClient();
  return useMutation([userId], {
    mutationFn: async () => {
      const orginalData = queryClient.getQueryData<WeatherCardCity[]>([
        userId,
        'weatherCards',
      ]);
      if (orginalData?.length && newWeatherCardOrder.length) {
        const changedItems = checkOrderChange(orginalData, newWeatherCardOrder);

        if (changedItems.length) {
          queryClient.setQueryData(
            [userId, 'weatherCards'],
            () => newWeatherCardOrder
          );

          const changes = changedItems.map((changedItem) => {
            return supabase
              .from('weatherCard')
              .update({ order: changedItem.order })
              .eq('cityId', changedItem.cityId)
              .eq('userId', changedItem.userId);
          });
          return await Promise.all(changes);
        }
      }
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData([userId, 'weatherCards'], () => context);
    },
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries([userId, 'weatherCards']);
    },
  });
};

export const useDeleteWeatherCardOrder = (
  userId: string,
  deletingCardId: number
) => {
  const queryClient = useQueryClient();
  return useMutation([userId], {
    mutationFn: async () => {
      const orginalData = queryClient.getQueryData<WeatherCardCity[]>([
        userId,
        'weatherCards',
      ]);
      if (!orginalData?.find((card) => card.cityId === deletingCardId)) return;
      queryClient.setQueryData<WeatherCardCity[]>(
        [userId, 'weatherCards'],
        (oldValue) => oldValue?.filter((card) => card.cityId !== deletingCardId)
      );
      return await supabase
        .from('weatherCard')
        .delete()
        .eq('cityId', deletingCardId)
        .eq('userId', userId);
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData([userId], () => context);
    },
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries([userId]);
    },
  });
};
