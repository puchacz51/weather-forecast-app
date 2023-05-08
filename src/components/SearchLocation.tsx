import { TbSearch } from 'react-icons/tb';
import { City } from '../utilities/type';
import { useCityQuery } from '../utilities/useCity';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHistory } from 'react-icons/ai';
import { LoadingSpinner } from './LoadingSpinner';
import { useRootStore } from '../store/store';
import { MdGpsFixed } from 'react-icons/md';
import { useGpsLocation } from '../utilities/useGPSLocation';

export const SearchLocation = () => {
  const searchHistory = useRootStore((state) => state.searchHistory);
  const [currentSearchCities, setCurrentSearchCities] = useState<City[]>();
  const [inputVal, setInputVal] = useState('');
  const {
    data: inputCities,
    refetch,
    isFetching,
    dataUpdatedAt: lastInputUpdate,
  } = useCityQuery(inputVal, { enabled: false });
  const {
    data: gpsCities,
    isFetching: gpsCityIsFetching,
    start: gpsStart,
    dataUpdatedAt: lastGpsUpadate,
  } = useGpsLocation();
  const refetchCities = () => {
    if (inputVal) {
      refetch();
    }
  };
  const handleGpsBtn = () => {
    setInputVal('');
    gpsStart();
  };

  useEffect(() => {
    const timeout = setTimeout(refetchCities, 500);
    return () => clearTimeout(timeout);
  }, [inputVal]);
  useEffect(() => {
    if (lastInputUpdate < lastGpsUpadate) {
      setCurrentSearchCities(gpsCities);
    } else {
      setCurrentSearchCities(inputCities);
    }
  }, [inputCities, gpsCities]);

  return (
    <div className='searchLocationContainer'>
      <label htmlFor='city' className='searchLocationHeader'>
        Find City
      </label>
      <div className='inputWrapper'>
        {isFetching || gpsCityIsFetching ? (
          <LoadingSpinner />
        ) : (
          <TbSearch className='searchIcon' />
        )}
        <input
          type='text'
          name='city'
          className='searchInput'
          placeholder='type city'
          onChange={(e) => setInputVal(e.currentTarget.value)}
        />

        <button className='searchLocationGPSBtn' onClick={handleGpsBtn}>
          <MdGpsFixed />
        </button>
      </div>

      {currentSearchCities ? (
        <LocationList cities={currentSearchCities} />
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
