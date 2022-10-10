import { City, WeatherObjectResult } from '../utilities/type';
import { useWeather } from '../utilities/useWeather';
import { CgSpinnerAlt } from 'react-icons/cg';
const CityWeatherCard = ({ city }: { city: City }) => {
  const { city: name, longitude, latitude } = city;

  const {
    data: weather,
    status,
    error,
    isLoading,
  } = useWeather(longitude, latitude);
//   const {} =weather
  const {
    data: {},
  } = weather as WeatherObjectResult;



  if (isLoading||!weather)
    return (
      <div className='WeatherCardLoaded'>
        <CgSpinnerAlt />
      </div>
    );
		console.log(weather);
		
  return (
    <div className='WeatherCard'>
      <h3 className='title'>{name}</h3>
    </div>
  );
};

export { CityWeatherCard };
