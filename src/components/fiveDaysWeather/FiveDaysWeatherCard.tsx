import { dataForWeather } from './data5';
import './fiveDaysWeatherCard.scss';
import { FiveDaysWeatherIcon } from './FIveDaysWeatherIcon';
import { useState, useContext } from 'react';
import { FiveDaysWeather, FiveDaysWeatherElement } from '../../WeatherTypes';
import { FiveDaysWeatherContext } from '../../utilities/WeatherContext';
import { getWeatherIconValues } from '../../utilities/getWeatherIconValues';

type WeatherLegend = {
  minTemp: number;
  maxTemp: number;
  precipitationMin: number;
  precipitationMax: number;
};

const WeatherListLegend = ({ info }: { info: WeatherLegend }) => {
  const {maxTemp,minTemp,precipitationMax,precipitationMin} = info 





  return (
    <div className='fiveDaysWeatherDayContainer'>
      <h3 className='dayName'>day</h3>
      <div className='weatherLegend'>
      </div>
    </div>
  );
};

const FiveDaysWeatherListElement = ({
  weather,
  selectDate,
}: {
  weather: FiveDaysWeatherElement;
  selectDate: () => void;
}) => {
  const { dt_txt, weather: weatherDesc, main, rain = 0, snow = 0 } = weather;
  const { icon } = weatherDesc[0];
  const { temp } = main;
  const [hours] = dt_txt.split(' ')[1].split(':');

  return (
    <button className='dayWeatherElement' onClick={selectDate}>
      <h3 className='elementHeader'>{hours}:00</h3>
      <div className='weatherIconContainer'>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt='weather icon'
          className='weatherIcon'
        />
        <span className='temperature'>{(temp / 10).toFixed(0)} &deg;</span>
      </div>
      <div className='precipitation'></div>
    </button>
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
  const tempList = weatherList.map((weather) => weather.main.temp);
  const precipitationlist = weatherList.map(
    (weather) => (weather?.rain || 0) + (weather?.snow || 0)
  );
  const minTemp = Math.min(...tempList);
  const maxTemp = Math.max(...tempList);
  const precipitationMin = Math.min(...precipitationlist);
  const precipitationMax = Math.max(...precipitationlist);
  const legendInfo = { minTemp, maxTemp, precipitationMax, precipitationMin };
  return (
    <div className='fiveDaysWeatherList'>
      <WeatherListLegend info={legendInfo} />
      {weatherDaysList.map(({ dayName, dayOfMonth }) => (
        <div key={dayName} className='fiveDaysWeatherDayContainer'>
          <h3 className='dayName'>{dayName}</h3>
          <div className='dayWeatherList'>
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
