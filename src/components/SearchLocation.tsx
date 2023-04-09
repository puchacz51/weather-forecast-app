import { TbSearch } from 'react-icons/tb';
import { CgSpinnerAlt } from 'react-icons/cg';
import { City } from '../utilities/type';
import { useCity, useCityQueryById } from '../utilities/useCity';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useWaeatherStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

const initialData = JSON.parse(
  '{"data":[{"id":3350606,"wikiDataId":"Q24668","type":"CITY","city":"Aixirivall","name":"Aixirivall","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.46245,"longitude":1.50209,"population":0},{"id":3216144,"wikiDataId":"Q24656","type":"CITY","city":"Aixovall","name":"Aixovall","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.47635833,"longitude":1.48949167,"population":0},{"id":3406038,"wikiDataId":"Q4699394","type":"CITY","city":"Aixàs","name":"Aixàs","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.48638889,"longitude":1.46722222,"population":0},{"id":3673384,"wikiDataId":"Q2522163","type":"CITY","city":"Andorra la Vella","name":"Andorra la Vella","country":"Andorra","countryCode":"AD","region":"Andorra la Vella","regionCode":"07","regionWdId":"Q2522163","latitude":42.5,"longitude":1.5,"population":22615},{"id":397,"wikiDataId":"Q1863","type":"CITY","city":"Andorra la Vella","name":"Andorra la Vella","country":"Andorra","countryCode":"AD","region":"Andorra la Vella","regionCode":"07","regionWdId":"Q2522163","latitude":42.5,"longitude":1.5,"population":22151}],"links":[{"rel":"first","href":"/v1/geo/cities?offset=0&limit=5&types=CITY&LIMIT=10&SORT_FIELD=population&namePrefix="},{"rel":"next","href":"/v1/geo/cities?offset=5&limit=5&types=CITY&LIMIT=10&SORT_FIELD=population&namePrefix="},{"rel":"last","href":"/v1/geo/cities?offset=537565&limit=5&types=CITY&LIMIT=10&SORT_FIELD=population&namePrefix="}],"metadata":{"currentOffset":0,"totalCount":537566}}'
).data as City[];

export const SearchLocation = () => {
  const [inputVal, setInputVal] = useState('');
  const {
    data: cities,
    isError,
    isFetched,
    refetch,
  } = useCity(inputVal, { enabled: false });

  const refetchCities = () => {
    if (inputVal) {
      refetch();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(refetchCities, 500);
    return () => clearTimeout(timeout);
  }, [inputVal, refetchCities]);
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
        <CgSpinnerAlt className='loadingIcon' />
      </div>
      {cities && <LocationList cities={cities} />}
    </div>
  );
};
const LocationListElement = ({
  city,
  index,
}: {
  city: City;
  index: number;
}) => {
  const { city: name, region, countryCode, id } = city;
  const { setSelectedCity } = useWaeatherStore();
  const naviagte = useNavigate();

  const handleCitySelect = () => {
    naviagte(`weather/${id}/current`);
    setSelectedCity(city);
  };
  return (
    <button onClick={handleCitySelect} className='locationListElement'>
      <span className='index'>{index}.</span>
      <span className='name'>
        {name.length > 15 ? `${name.slice(0, 12)}...` : name}
      </span>
      <span className='country'>
        {/* {country.length > 12 ? `${country.slice(0, 10)}...` : country}
         */}
        {countryCode}
      </span>
      <span className='region'>
        {region.length > 12 ? `${name.slice(0, 10)}...` : region}
      </span>
    </button>
  );
};

const LocationList = ({
  cities,
}: {
  cities: City[];
}) => {
  return (
    <div className='locationListContainer'>
      {cities.map((city, i) => (
        <LocationListElement city={city} key={city.id} index={i + 1} />
      ))}
    </div>
  );
};
