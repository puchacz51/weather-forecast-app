import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useCityQuery } from '../../utilities/useCity';
import { City } from '../../utilities/type';
import z from 'zod';
import { useAddUserWeatherCard } from '../../utilities/useUserWeatherCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { useRootStore } from '../../store/store';
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
  isLoading,
}: {
  cities: City[] | null;
  onSelect: (city: City) => void;
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <div className='citiesListContainer'>
        <LoadingSpinner />
      </div>
    );
  if (cities === null) return <div className='citiesListContainer'></div>;

  if (cities.length === 0)
    return <div className='citiesListContainer'>not found</div>;

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

const AddNewWeatherCardBtn = () => {
  const { setAddFormIsOpen } = useRootStore();

  return (
    <button
      className='addNewWeatherCardBtn'
      type='button'
      onClick={() => setAddFormIsOpen(true)}>
      <AiOutlineAppstoreAdd />
    </button>
  );
};
const AddNewWeatherCardForm = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityInputVal, setCityInputVal] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { session, setAddFormIsOpen } = useRootStore((state) => state);
  const userId = session?.user.id;
  const { mutate, isSuccess } = useAddUserWeatherCard(userId as string);
  const {
    data: cities,
    refetch,
    isFetching,
  } = useCityQuery(cityInputVal, {
    enabled: false,
  });

  if (isSuccess) {
    setAddFormIsOpen(false);
  }
  const refetchCities = () => {
    if (cityInputVal) {
      refetch();
    }
  };
  useEffect(() => {
    const timeout = setTimeout(refetchCities, 500);
    return () => clearTimeout(timeout);
  }, [cityInputVal]);
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
    <div className='addNewWeatherCardForm'>
      <h3 className='title'>new weather</h3>
      <form action='' onSubmit={handleSubmit}>
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
                placeholder='search city'
                onChange={(e) => setCityInputVal(e.currentTarget.value)}
                value={cityInputVal}
                className='textInput'
              />
            </label>
            <CitiesList
              isLoading={isFetching}
              onSelect={handleSelectCity}
              cities={cities || null}
            />
          </>
        )}
        <button
          type='submit'
          disabled={!isValid}
          className='submitWeatherCardBtn'>
          add
        </button>
      </form>
    </div>
  );
};

export const AddNewWeatherCard = () => {
  const { setAddFormIsOpen, addFormIsOpen } = useRootStore((state) => state);

  return (
    <div className='addNewWeatherCardContainer'>
      {addFormIsOpen ? <AddNewWeatherCardForm /> : <AddNewWeatherCardBtn />}
    </div>
  );
};
