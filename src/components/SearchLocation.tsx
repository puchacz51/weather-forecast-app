import { TbSearch } from 'react-icons/tb';
import { CgSpinnerAlt } from 'react-icons/cg';
import { City } from '../utilities/type';
import { useCity } from '../utilities/useCity';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useWaeatherStore } from '../store/store';

const initialData = JSON.parse(
  '{"data":[{"id":3350606,"wikiDataId":"Q24668","type":"CITY","city":"Aixirivall","name":"Aixirivall","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.46245,"longitude":1.50209,"population":0},{"id":3216144,"wikiDataId":"Q24656","type":"CITY","city":"Aixovall","name":"Aixovall","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.47635833,"longitude":1.48949167,"population":0},{"id":3406038,"wikiDataId":"Q4699394","type":"CITY","city":"Aixàs","name":"Aixàs","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.48638889,"longitude":1.46722222,"population":0},{"id":3673384,"wikiDataId":"Q2522163","type":"CITY","city":"Andorra la Vella","name":"Andorra la Vella","country":"Andorra","countryCode":"AD","region":"Andorra la Vella","regionCode":"07","regionWdId":"Q2522163","latitude":42.5,"longitude":1.5,"population":22615},{"id":397,"wikiDataId":"Q1863","type":"CITY","city":"Andorra la Vella","name":"Andorra la Vella","country":"Andorra","countryCode":"AD","region":"Andorra la Vella","regionCode":"07","regionWdId":"Q2522163","latitude":42.5,"longitude":1.5,"population":22151}],"links":[{"rel":"first","href":"/v1/geo/cities?offset=0&limit=5&types=CITY&LIMIT=10&SORT_FIELD=population&namePrefix="},{"rel":"next","href":"/v1/geo/cities?offset=5&limit=5&types=CITY&LIMIT=10&SORT_FIELD=population&namePrefix="},{"rel":"last","href":"/v1/geo/cities?offset=537565&limit=5&types=CITY&LIMIT=10&SORT_FIELD=population&namePrefix="}],"metadata":{"currentOffset":0,"totalCount":537566}}'
).data as City[];

export const SearchLocation = () => {
  const [inputVal, setInputVal] = useState('');
  // const [selectedCity, setSelectedCity] = useState<City>();
  const { setSelectedCity } = useWaeatherStore();

  const {
    data: cities,
    isError,
    isFetched,
    refetch,
  } = useCity(inputVal, { enabled: false, initialData: initialData });

  const refetchCities = () => {
    if (inputVal) {
      refetch();
    }
  };

  const handleCityChange = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    const inputValue = e.currentTarget.value;
    const eventType = e.type;
    setInputVal(inputValue);
    if (eventType == 'select') {
      const cityIndex = cities?.findIndex(
        (city) =>
          city.city.toLowerCase().trim() === inputVal.toLowerCase().trim()
      );

      if (cityIndex !== -1 && cityIndex !== undefined && cities) {
        setSelectedCity(cities[cityIndex]);
        setInputVal('');
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(refetchCities, 500);
    return () => clearTimeout(timeout);
  }, [inputVal, refetchCities]);
  return (
    <div className='searchLocationContainer'>
      <label htmlFor='city'>Find City</label>
      <div className='inputWrapper'>
        <TbSearch className='searchIcon' />
        <input
          type='text'
          name='city'
          className='searchInput'
          placeholder='type city'
          onChange={handleCityChange}
        />
        <CgSpinnerAlt className='loadingIcon' />
      </div>
      {initialData && <LocationList setCity={setSelectedCity} cities={initialData} />}
    </div>
  );
};
const LocationListElement = ({
  city,
  setCity,
  index,
}: {
  city: City;
  setCity: () => void;
  index: number;
}) => {
  const { city: name, region, country } = city;

  return (
    <button onClick={setCity} className='locationListElement'>
      <span className='index'>{index}.</span>
      <span className='name'>
        {name.length > 15 ? `${name.slice(0, 12)}...` : name}
      </span>
      <span className='country'>
        {country.length > 12 ? `${country.slice(0, 10)}...` : country}
      </span>
      <span className='region'>
        {region.length > 12 ? `${name.slice(0, 10)}...` : region}
      </span>
    </button>
  );
};

const LocationList = ({
  cities,
  setCity,
}: {
  cities: City[];
  setCity: (city: City) => void;
}) => {
  return (
    <div className='locationListContainer'>
      <LocationListElement
        index={0}
        setCity={() => {
          1 + 1;
        }}
        city={{ city: 'name', country: 'country', region: 'region' } as City}
      />
      {cities.map((city, i) => (
        <LocationListElement
          setCity={() => setCity(city)}
          city={city}
          key={city.id}
          index={i+1}
        />
      ))}
    </div>
  );
};
