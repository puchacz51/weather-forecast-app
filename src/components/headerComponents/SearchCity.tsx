import '../../Header.scss';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useWaeatherStore } from '../../store/store';
import { City } from '../../utilities/type';
import { useCity } from '../../utilities/useCity';
import { motion } from 'framer-motion';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const switchOnAnimation = {
    backgroundColor: '#00ccff',
    left: '100%',
    translateX: '-100%',
    translateY: '-50%',
    transition: {
      duration: 1,
    },
  };
  const switchOFFAnimation = {
    backgroundColor: '#3cff00',
    left: 0,
    translateX: '0%',
    translateY: '-50%',
    transition: {
      duration: 1,
    },
  };

  const toggleSwitch = () => {
    setIsOn((isOn) => !isOn);
  };

  return (
    <motion.div
      className='switchContainer'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <motion.div
        className='toggleElement'
        onClick={toggleSwitch}
        animate={isOn ? switchOnAnimation : switchOFFAnimation}
      />
    </motion.div>
  );
};

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
    const cityIndex = cities?.findIndex(
      (city) =>
        city.city.toLowerCase().trim() === inputValue.toLowerCase().trim()
    );
    setTextInput(inputValue);
    console.log('select', inputValue, cityIndex, cities);

    if (cityIndex !== -1 && cityIndex !== undefined && cities) {
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
      <label htmlFor='city'>
        <input
          className='searchCityInput'
          value={textInput}
          onChange={handleCityChange}
          onSelect={handleCityChange}
          type='text'
          list='cities'
          placeholder='city name'
        />
      </label>
      {/* <ToggleSwitch /> */}
      {isLoading && textInput && <>...loading </>}

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
