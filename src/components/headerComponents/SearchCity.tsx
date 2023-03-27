import '../../Header.scss';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useWaeatherStore } from '../../store/store';
import { City } from '../../utilities/type';
import { useCity } from '../../utilities/useCity';
import { CurrentWeatherCard } from '../WeatherCard';

export const SearchCity = () => {
  const [textInput, setTextInput] = useState('');
  const {
    refetch,
    data: cities,
    isLoading,
  } = useCity(textInput, {
    enabled: false,
    keepPreviousData: true,
  });
  const { selectedCity, setSelectedCity } = useWaeatherStore();
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
  // if (!selectedCity) {
  //   console.log(111);

  //   setSelectedCity({
  //     city: 'testowe',
  //     longitude: 18,
  //     latitude: 20,
  //   } as City);
  // }
  useEffect(() => {
    const timeout = setTimeout(refetchCities, 300);

    return () => clearTimeout(timeout);
  }, [textInput, refetchCities]);
  return (
    <div className='searchCityContainer'>
      <label htmlFor='city'></label>
      <input
        className='searchCityInput'
        value={textInput}
        onChange={handleCityChange}
        type='text'
        list='cities'
        placeholder='city name'
      />
      {isLoading && textInput && <>...loading </>}
      {/* {selectedCity && <FiveDaysWeatherCard />} */}
      {selectedCity && <CurrentWeatherCard />}

      <CityList cities={cities} />
    </div>
  );
};
const CityList = ({ cities }: { cities: City[] | undefined }) => {
  if (!cities) return <datalist></datalist>;
  return (
    <datalist id='cities' className='citiesList'>
      {cities.map((city) => (
        <option key={city.city} value={city.city} />
      ))}
    </datalist>
  );
};
