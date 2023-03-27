import { FiveDaysWeather, FiveDaysWeatherElement } from '../../WeatherTypes';
import {
  FiveDaysWeatherListElement,
  WeatherListLegend,
} from './FiveDaysWeatherlistElement';

export const FiveDaysWeatherList = ({
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
    (weather) => (weather?.rain?.['3h'] || 0) + (weather?.snow?.['3h'] || 0)
  );
  const minTemp = Math.min(...tempList);
  const maxTemp = Math.max(...tempList);
  const precipitationMin = Math.min(...precipitationlist);
  const precipitationMax = Math.max(...precipitationlist);
  const legendInfo = { minTemp, maxTemp, precipitationMax, precipitationMin };

  return (
    <div className='fiveDaysWeatherListContainer'>
      <WeatherListLegend info={legendInfo} />

      <div className='fiveDaysWeatherList'>
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
                .map((weatherInfo) => (
                  <FiveDaysWeatherListElement
                    selectDate={() =>
                      selectDate(
                        weatherList.findIndex(
                          (weather) => weatherInfo.dt === weather.dt
                        )
                      )
                    }
                    key={weatherInfo.dt}
                    weather={weatherInfo}
                    legendInfo={legendInfo}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
