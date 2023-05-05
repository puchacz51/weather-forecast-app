import { useEffect, useState } from 'react';
import { useCitiesByCoords } from './useCity';

export const useGpsLocation = () => {
  const [gpsData, setGpsData] = useState<GeolocationPosition | null>(null);
  const [gpsIsFetching, setGpsIsFetching] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [gpsError, setGpsError] = useState<GeolocationPositionError | null>();
  const {
    refetch,
    data: cities,
    isFetching: apiIsFetching,
    error,
    ...useQueryProps
  } = useCitiesByCoords(gpsData, {
    enabled: false,
  });

  useEffect(() => {
    if (gpsData) {
      refetch();
    }
  }, [gpsData]);

  useEffect(() => {
    if (enabled) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          setGpsIsFetching(false);
          setGpsData(data);
          setGpsError(null);
          setEnabled(false);
        },
        (err) => {
          setGpsIsFetching(false);
          setGpsError(err);
          console.log(err);
          setEnabled(false);
        }
      );
    }
  }, [enabled]);

  return {
    ...useQueryProps,
    data: cities,
    error: error || gpsError,
    start: () => setEnabled(true),
    isFetching: apiIsFetching || gpsIsFetching,
  };
};
