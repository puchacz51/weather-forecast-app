import { TbSearch } from 'react-icons/tb';
import { CgSpinnerAlt } from 'react-icons/cg';
import { City } from '../utilities/type';
import { useCityQuery, useCityQueryById } from '../utilities/useCity';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHistory } from 'react-icons/ai';
import { LoadingSpinner } from './LoadingSpinner';
import { useRootStore } from '../store/store';

export const SearchLocation = () => {
  const searchHistory = useRootStore((state) => state.searchHistory);
  const [inputVal, setInputVal] = useState('');
  const {
    data: cities,
    refetch,
    isFetching,
  } = useCityQuery(inputVal, { enabled: false });
  const refetchCities = () => {
    if (inputVal) {
      refetch();
    }
  };
  useEffect(() => {
    const timeout = setTimeout(refetchCities, 500);
    return () => clearTimeout(timeout);
  }, [inputVal]);
  return (
    <div className='searchLocationContainer'>
      <label htmlFor='city' className='searchLocationHeader'>
        Find City
      </label>
      <div className='inputWrapper'>
        <TbSearch className='searchIcon' />
        <input
          type='text'
          name='city'
          className='searchInput'
          placeholder='type city'
          onChange={(e) => setInputVal(e.currentTarget.value)}
        />
        {isFetching && <LoadingSpinner />}
      </div>
      {cities ? (
        <LocationList cities={cities} />
      ) : (
        <div className='historySearchContainer'>
          {searchHistory.map((city) => (
            <LocationHistoryElement city={city} key={`hisory${city.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};
export const LocationListElement = ({
  city,
  index,
}: {
  city: City;
  index: number;
}) => {
  const { city: name, region, countryCode, id } = city;
  const [setSelectedCity, setSearchHistory] = useRootStore((state) => [
    state.setSelectedCity,
    state.setSearchHistory,
  ]);
  const navigate = useNavigate();
  const handleCitySelect = () => {
    setSearchHistory(city);
    navigate(`weather/${id}/current`);
    setSelectedCity(city);
  };
  return (
    <button onClick={handleCitySelect} className='locationListElement'>
      <span className='index'>{index}.</span>
      <span className='name'>
        {name.length > 15 ? `${name.slice(0, 12)}...` : name}
      </span>
      <span className='country'>{countryCode}</span>
      <span className='region'>
        {region.length > 12 ? `${name.slice(0, 10)}...` : region}
      </span>
    </button>
  );
};

export const LocationList = ({ cities }: { cities: City[] }) => {
  return (
    <div className='locationListContainer'>
      {cities.map((city, i) => (
        <LocationListElement city={city} key={city.id} index={i + 1} />
      ))}
    </div>
  );
};
const LocationHistoryElement = ({ city }: { city: City }) => {
  const { city: name, region, countryCode, id } = city;
  const [setSelectedCity, setSearchHistory] = useRootStore((state) => [
    state.setSelectedCity,
    state.setSearchHistory,
  ]);
  const navigate = useNavigate();
  const handleCitySelect = () => {
    setSearchHistory(city);
    navigate(`weather/${id}/current`);
    setSelectedCity(city);
  };
  return (
    <button className='historyElementBtn' onClick={handleCitySelect}>
      <AiOutlineHistory className='icon' />
      {city.name}
    </button>
  );
};
