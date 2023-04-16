import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useWaeatherStore } from '../../../store/store';
import { useCityQueryById } from '../../../utilities/useCity';
export const WeatherCards = () => {
  const { selectedCity, setSelectedCity } = useWaeatherStore();
  const { cityId = '' } = useParams();
  const navigate = useNavigate();

  const {
    data: city,
    error,
    isFetching,
    refetch,
  } = useCityQueryById(cityId, {
    enabled: false,
    onSuccess: (data) => {
      setSelectedCity(data);
    },
    onError: (err) => {
		console.log(err);
		
      setInterval(() => {
        navigate('/');
      }, 1000);
    },
  });
  if (!selectedCity) {
    if (!cityId) {
      console.log('nie ma id');

      navigate('/');
    }
    if (!isFetching) {
      refetch();
    }
  }
  if (isFetching) return <>loading ..... </>;
  if (error) <> Cannot find location redirecting</>;
  return <Outlet />;
};
