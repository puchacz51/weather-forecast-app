import { SyntheticEvent, useCallback, useEffect, useRef } from 'react';
import { City } from '../../utilities/type';
import { useCityQuery } from '../../utilities/useCity';
import { motion } from 'framer-motion';
import { TbSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner';
import { useRootStore } from '../../store/store';
export const SearchCity = () => {
  const {
    setSelectedCity,
    setHeaderInputText,
    headerInputText,
    headerInputIsOpen,
    setHeaderInputIsOpen,
  } = useRootStore((state) => state);
  const {
    refetch,
    data: cities,
    isFetching,
  } = useCityQuery(headerInputText, {
    enabled: false,
    keepPreviousData: true,
  });

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainer = useRef<HTMLDivElement>(null);

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
        navigate(`weather/${cities[cityIndex].id}/current`);
      }
    }
  };
  const handleWindowClick = useCallback((e: MouseEvent) => {
    if (!inputContainer.current?.contains(e.target as Node)) {
      setHeaderInputIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (headerInputIsOpen) {
      window.addEventListener('click', handleWindowClick);
    } else {
      window.removeEventListener('click', handleWindowClick);
    }
  }, [headerInputIsOpen]);

  useEffect(() => {
    const timeout = setTimeout(refetchCities, 300);
    return () => clearTimeout(timeout);
  }, [headerInputText, refetchCities]);
  return (
    <div className='searchCityContainer' ref={inputContainer}>
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
          ref={inputRef}
          className='searchCityInput'
          value={headerInputText}
          onChange={handleCityChange}
          onSelect={handleCityChange}
          type='text'
          list='cities'
          placeholder='city name'
        />
        {isFetching && <LoadingSpinner />}
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
