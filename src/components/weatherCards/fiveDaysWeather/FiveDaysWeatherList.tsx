import { FiveDaysWeather } from '../../../WeatherTypes';
import { FiveDaysWeatherListElement } from './FiveDaysWeatherlistElement';
import { useRef, useState } from 'react';
import { getPrecitipation } from '../../../utilities/getWeatherIconValues';
type WeatherDaysSelectorProps = {
  days: { dayOfMonth: string; dayName: string; dayNameShort: string }[];
  selectDay: (day: string) => void;
};

const WeatherDaysSelector = ({ days, selectDay }: WeatherDaysSelectorProps) => {
  return (
    <div className='weatherDaysSelectorContainer'>
      {days.map(({ dayName, dayOfMonth, dayNameShort }) => (
        <button
          key={`btn${dayOfMonth}`}
          onClick={() => selectDay(dayName)}
          className='weatherDaySelectorButton'>
          {dayNameShort}
        </button>
      ))}
    </div>
  );
};

export const FiveDaysWeatherList = ({
  weatherList,
  selectDate,
}: {
  weatherList: FiveDaysWeather['list'];
  selectDate: (date: number) => void;
}) => {
  const [dayContainerPosition, setDayContainerPosition] = useState(0);
  const weatherDaysList = weatherList.reduce((acc, currentTime) => {
    const dayOfMonth = currentTime.dt_txt.split(' ')[0].split('-')[2];
    if (
      (acc.length && acc[acc.length - 1]?.dayOfMonth !== dayOfMonth) ||
      !acc.length
    ) {
      const date = new Date(currentTime.dt * 1000);
      return [
        ...acc,
        {
          dayOfMonth,
          dayName: date.toLocaleDateString('en-US', {
            weekday: 'long',
          }),
          dayNameShort: date.toLocaleDateString('en-US', {
            weekday: 'short',
          }),
        },
      ];
    }
    return acc;
  }, [] as { dayOfMonth: string; dayName: string; dayNameShort: string }[]);
  const tempList = weatherList.map((weather) => weather.main.temp);
  const precipitationlist = weatherList.map((weather) => {
    const { rain, snow } = getPrecitipation(weather);
    return rain + snow;
  });
  const minTemp = Math.min(...tempList);
  const maxTemp = Math.max(...tempList);
  const precipitationMin = Math.min(...precipitationlist);
  const precipitationMax = Math.max(...precipitationlist);
  const legendInfo = { minTemp, maxTemp, precipitationMax, precipitationMin };
  const weatherListContainerRef = useRef<HTMLDivElement>(null);
  const handleSelectDay = (selectedDay: string) => {
    const dayContainers = weatherListContainerRef.current
      ?.childNodes as NodeListOf<
      ChildNode & { id: string; offsetLeft: number }
    >;
    dayContainers?.forEach((child) => {
      if (child.id === selectedDay) {
        if (weatherListContainerRef.current) {
          weatherListContainerRef.current?.scrollTo(child.offsetLeft, 0);
        }
      }
    });
  };

  return (
    <div className='fiveDaysWeatherListContainer'>
      <WeatherDaysSelector
        days={weatherDaysList}
        selectDay={(s) => {
          handleSelectDay(s);
        }}
      />
      <div
        className='fiveDaysWeatherList'
        ref={weatherListContainerRef}
        style={{ left: dayContainerPosition + '%' }}>
        {weatherDaysList.map(({ dayName, dayOfMonth }) => (
          <div
            key={dayName}
            id={dayName}
            className='fiveDaysWeatherDayContainer'>
            <h3 className='dayName'>{dayName}</h3>
            <div className='dayWeatherList'>
              {weatherList
                .filter((weatherInfo) => {
                  const dayOfMonthElement = weatherInfo.dt_txt
                    .split(' ')[0]
                    .split('-')[2];
                  return dayOfMonthElement === dayOfMonth;
                })
                .map((weatherInfo) => {
                  return (
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
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
