import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import './App.scss';
// import { useWeather } from './utilities/useWeather';
import { City } from './utilities/type';
import { useCity } from './utilities/useCity';
import {
  CurrentWeatherCard,
  DayWeatherList,
} from './component/WeatherCard';

function App() {
  const [textInput, setTextInput] = useState('');
  const {
    refetch,
    data: cities,
    isLoading,
  } = useCity(textInput, {
    enabled: false,
    keepPreviousData: true,
  });
  const [selectedCity, setSelectedCity] = useState<City | null>();

  const refetchCities = useCallback(() => {
    if (textInput) {
      refetch();
    }
  }, [textInput, refetch]);

  const handleCityChange = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    const inputValue = e.currentTarget.value;
    const cityIndex = cities?.findIndex((city) => city.city === inputValue);
    setTextInput(inputValue);

    if (cityIndex && cities) {
      setSelectedCity(cities[cityIndex]);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(refetchCities, 700);

    return () => clearTimeout(timeout);
  }, [textInput, refetchCities]);
  return (
    <div className='App'>
      <label htmlFor='city'>City</label>
      <input
        value={textInput}
        onChange={handleCityChange}
        type='text'
        list='cities'
      />
      {isLoading && <>...loading </>}
      {/* {selectedCity && <CityWeatherCard city={selectedCity} />} */}
      {/* {JSON.stringify(selectedCity)} */}
      {selectedCity && <CurrentWeatherCard city={selectedCity} />}
      <CurrentWeatherCard city={{city:'jakies',latitude:51,longitude:18,}as City} />
      <CityList cities={cities} />
    </div>
  );
}
const CityList = ({ cities }: { cities: City[] | undefined }) => {
  if (!cities) return <datalist></datalist>;
  return (
    <datalist id='cities' className='citiesList'>
      {cities.map((city) => (
        <option value={city.city} />
      ))}
    </datalist>
  );
};
interface CityWeatherCardProps {}

export default App;

// <div className='WeatherCard'>
//   <h3 className='title'>Bydgoszcz</h3>
//   <p>43</p>
//   {/* <DayWeatherList /> */}
// </div>;
