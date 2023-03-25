import { dataForWeather } from './data5';
import './fiveDaysWeatherCard.scss';
import { FiveDaysWeatherIcon } from './FIveDaysWeatherIcon';
import { useState, useContext } from 'react';
import { FiveDaysWeather, FiveDaysWeatherElement } from '../../WeatherTypes';
import { FiveDaysWeatherContext } from '../../utilities/WeatherContext';
import { getWeatherIconValues } from '../../utilities/getWeatherIconValues';

const FiveDaysWeatherListElement = ({
  weather,
  selectDate,
}: {
  weather: FiveDaysWeatherElement;
  selectDate: () => void;
}) => {
  const { dt, dt_txt } = weather;

  const [hours] = dt_txt.split(' ')[1].split(':');

  return (
    <div className='fiveDayWeatherListElement'>
      <h3 className='elementHeader'>{hours}:00</h3>
    </div>
  );
};

const FiveDaysWeatherList = ({
  weatherList,
  selectDate,
}: {
  weatherList: FiveDaysWeather['list'];
  selectDate: (date: number) => void;
}) => {

  const weatherDaysList = weatherList.reduce((acc, currentTime) => {
    const dayOfMonth = currentTime.dt_txt.split(' ')[0].split('-')[2];
    if (
      (acc.length && acc[acc.length - 1]?.dayOfMonth !== dayOfMonth) ||
      !acc.length
    ) {
      return [
        ...acc,
        {
          dayOfMonth,
          dayName: new Date(currentTime.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
          }),
        },
      ];
    }
    return acc;
  }, [] as { dayOfMonth: string; dayName: string }[]);


  return (
    <div className='fiveDaysWeatherList'>
      {weatherDaysList.map(({ dayName, dayOfMonth }) => (
        <div key={dayName} className='fiveDaysWeatherDayContainer'>
          <h3 className='dayName'>{dayName}</h3>

          {weatherList
            .filter((weatherInfo) => {
              const dayOfMonthElement = weatherInfo.dt_txt
                .split(' ')[0]
                .split('-')[2];
              return dayOfMonthElement === dayOfMonth;
            })
            .map((weatherInfo, index) => (
              <FiveDaysWeatherListElement
                selectDate={() => selectDate(index)}
                key={weatherInfo.dt}
                weather={weatherInfo}
              />
            ))}
        </div>
      ))}
    </div>
  );
};
const FiveDaysWeatherParams = ({
  weather,
}: {
  weather: FiveDaysWeatherElement;
}) => {
  const {
    clouds: { all: cloudity },
    rain,
    snow,
  } = weather;

  return (
    <div className='fiveDaysWeatherParams'>
      <span>cloudity: {cloudity}</span>
      <span>rain: {rain || 0}</span>
      <span>rain: {snow || 0}</span>
    </div>
  );
};

export const FiveDaysWeatherCard = () => {
  const [selectedWeatherDate, setSelectedWeatherDate] = useState(0);
  const [weather5days] = useState(dataForWeather);
  const iconsParams = getWeatherIconValues(
    weather5days.list[selectedWeatherDate]
  );

  return (
    <div className='fiveDaysWeatherCard'>
      <FiveDaysWeatherContext.Provider
        value={{
          weather: weather5days.list[selectedWeatherDate],
          iconParams: iconsParams,
        }}>
        <FiveDaysWeatherIcon />
      </FiveDaysWeatherContext.Provider>
      <FiveDaysWeatherList
        selectDate={setSelectedWeatherDate}
        weatherList={weather5days.list}
      />
      <FiveDaysWeatherParams weather={weather5days.list[selectedWeatherDate]} />
    </div>
  );
};
