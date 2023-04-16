import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useCityQuery } from '../../utilities/useCity';
import { City } from '../../utilities/type';
import z from 'zod';
import { useUserStore } from '../../store/userStore';
import { useAddUserWeatherCard } from '../../utilities/useUserWeatherCard';
const cityWeatherCardSchema = z.object({
  cityName: z.string(),
  latitude: z.number().min(-180).max(180),
  longitude: z.number().min(-180).max(180),
  userId: z.string().uuid(),
});

const CityComponent = ({
  city,
  btnTitle,
  BtnOnClick,
}: {
  city: City;
  btnTitle: string;
  BtnOnClick: () => void;
}) => {
  return (
    <div key={city.id} className='cityElement'>
      <p className='name'>{city.city}</p>
      <p className='country'>{city.country}</p>
      <p className='region'>{city.region}</p>
      <button
        className='citiesElementBtn'
        type='button'
        onClick={() => BtnOnClick()}>
        {btnTitle}
      </button>
    </div>
  );
};
const CitiesList = ({
  cities,
  onSelect,
}: {
  cities: City[];
  onSelect: (city: City) => void;
}) => {
  return (
    <div className='citiesListContainer'>
      {cities.map((city) => (
        <CityComponent
          btnTitle='select'
          key={city.id}
          city={city}
          BtnOnClick={() => onSelect(city)}
        />
      ))}
    </div>
  );
};

const AddNewWeatherCardBtn = ({ add }: { add: () => void }) => {
  return (
    <button className='addNewWeatherCardBtn' onClick={add}>
      <AiOutlineAppstoreAdd />
    </button>
  );
};
const AddNewWeatherCardForm = ({ close }: { close: () => void }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityInputVal, setCityInputVal] = useState('');
  const [isValid, setIsValid] = useState(false);
  const userId = useUserStore((store) => store.session?.user.id);
  const { mutate, reset, isSuccess } = useAddUserWeatherCard(userId as string);
  const { data: cities, refetch } = useCityQuery(cityInputVal, {
    enabled: false,
  });
  if (isSuccess) {
    reset();
    close();
  }
  const refetchCities = () => {
    if (cityInputVal) {
      refetch();
    }
  };
  useEffect(() => {
    const timeout = setTimeout(refetchCities, 500);
    return () => clearTimeout(timeout);
  }, [cityInputVal, refetchCities]);
  const handleSelectCity = (city: City) => {
    setCityInputVal('');
    setSelectedCity(city);
  };
  useEffect(() => {
    if (selectedCity) {
      try {
        cityWeatherCardSchema.parse({
          cityName: selectedCity.city,
          latitude: selectedCity.latitude,
          longitude: selectedCity.longitude,
          order: 2,
          userId,
          id: selectedCity.id.toString(),
        });
        setIsValid(true);
      } catch (err) {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  }, [selectedCity]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedCity && userId) {
      mutate({
        cityName: selectedCity.city,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        order: 2,
        cityId: selectedCity.id,
        userId,
      });
    }
  };

  return (
    <form action='' className='addNewWeatherCardForm' onSubmit={handleSubmit}>
      {selectedCity ? (
        <>
          <div className='selectedCity'>
            <p>selected city:</p>
            <CityComponent
              BtnOnClick={() => setSelectedCity(null)}
              city={selectedCity}
              btnTitle='x'
            />
          </div>
        </>
      ) : (
        <>
          <label htmlFor='city' className='textInputContainer'>
            <input
              type='text'
              placeholder='city'
              onChange={(e) => setCityInputVal(e.currentTarget.value)}
              value={cityInputVal}
              className='textInput'
            />
          </label>
          {cities && <CitiesList onSelect={handleSelectCity} cities={cities} />}
        </>
      )}
      <button
        type='submit'
        disabled={!isValid}
        className='submitWeatherCardBtn'>
        add
      </button>
    </form>
  );
};

export const AddNewWeatherCard = () => {
  const [isAdding, setIsAdding] = useState(true);
  return (
    <div className='addNewWeatherCardContainer'>
      {isAdding ? (
        <AddNewWeatherCardForm close={() => setIsAdding(false)} />
      ) : (
        <AddNewWeatherCardBtn add={() => setIsAdding(true)} />
      )}
    </div>
  );
};
