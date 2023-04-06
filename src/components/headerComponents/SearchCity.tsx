import '../../Header.scss';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useWaeatherStore } from '../../store/store';
import { City } from '../../utilities/type';
import { useCity } from '../../utilities/useCity';
import { motion } from 'framer-motion';
import { TbSearch } from 'react-icons/tb';
import { CgSpinnerAlt } from 'react-icons/cg';


export const SearchCity = () => {
  const {
    setSelectedCity,
    setHeaderInputText,
    headerInputText,
    headerInputIsOpen,
    setHeaderInputIsOpen,
  } = useWaeatherStore();
  const {
    refetch,
    data: cities,
    isFetching,
  } = useCity(headerInputText, {
    enabled: false,
    keepPreviousData: true,
  });
  const refetchCities = useCallback(() => {
    if (headerInputText) {
      refetch({});
    }
  }, [headerInputText, refetch]);

  const handleCityChange = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    const inputValue = e.currentTarget.value;
    const eventType = e.type;
    setHeaderInputText(inputValue);
    if (eventType == 'select') {
      const cityIndex = cities?.findIndex(
        (city) =>
          city.city.toLowerCase().trim() ===
          headerInputText.toLowerCase().trim()
      );

      if (cityIndex !== -1 && cityIndex !== undefined && cities) {
        setSelectedCity(cities[cityIndex]);
        setHeaderInputText('');
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(refetchCities, 300);
    return () => clearTimeout(timeout);
  }, [headerInputText, refetchCities]);
  return (
    <div className='searchCityContainer'>
      <button
        className='searchIcon'
        onClick={() => setHeaderInputIsOpen(!headerInputIsOpen)}>
        <TbSearch />
      </button>
      <motion.label
        className='inputWrapper'
        htmlFor='city'
        style={{ display: 'flex' }}
        initial={{
          width: '0ch',
        }}
        animate={{
          width: headerInputIsOpen ? '20ch' : '0ch',
          transition: { duration: 0.5 },
        }}>
        <input
          className='searchCityInput'
          value={headerInputText}
          onChange={handleCityChange}
          onSelect={handleCityChange}
          type='text'
          list='cities'
          placeholder='city name'
        />
        {isFetching && (
          <div className='wrapperLoadingIcon'>
            <CgSpinnerAlt className='loadingIcon' />
          </div>
        )}
      </motion.label>

      <CityList cities={cities} />
    </div>
  );
};
const CityList = ({ cities }: { cities: City[] | undefined }) => {
  if (!cities) return <datalist></datalist>;
  return (
    <datalist id='cities' className='citiesList'>
      {cities.map(({ city, region, countryCode, id }) => (
        <option key={id} value={city}>
          {countryCode} |{' '}
          {region.length > 14 ? region.slice(0, 12) + '...' : region}
        </option>
      ))}
    </datalist>
  );
};
