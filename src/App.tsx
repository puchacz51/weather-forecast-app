import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import './App.scss';
import { City } from './utilities/type';
import { useCity } from './utilities/useCity';
import { CurrentWeatherCard, DayWeatherList } from './component/WeatherCard';

const defaultCity = { city: 'takie', latitude: 51, longitude: 18 } as City;
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
      {isLoading && textInput && <>...loading </>}
      {selectedCity && <CurrentWeatherCard city={selectedCity} />}
      {/* <CurrentWeatherCard city={selectedCity || defaultCity} /> */}
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

