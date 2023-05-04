import { FiveDaysWeatherElement } from '../../../WeatherTypes';
import { WiRaindrop } from 'react-icons/wi';
import { ImBlocked } from 'react-icons/im';
import {
  getPrecitipation,
  getTimeFromTimezone,
} from '../../../utilities/getWeatherIconValues';
import { useWaetherIconContext } from '../../../utilities/WeatherContext';
type WeatherLegend = {
  minTemp: number;
  maxTemp: number;
  precipitationMin: number;
  precipitationMax: number;
};

const NoRainIconElement = () => {
  return (
    <div className='noPrecipitationElement'>
      <WiRaindrop className='dropIcon' />
      <ImBlocked className='blockedIcon' />
    </div>
  );
};
const PrecipitationAmountElemnt = ({
  snow,
  rain,
  precipitationMax,
}: {
  snow: number;
  rain: number;
  precipitationMax: number;
}) => {
  const precipitationTotal = rain + snow;
  const barHeight = Math.max(
    5,
    (precipitationTotal / (precipitationMax | 1)) * 80
  );
  if (!precipitationTotal)
    return (
      <div className='precipitationElement'>
        <NoRainIconElement />
      </div>
    );

  return (
    <div className='precipitationElement'>
      <span className='precipitationAmountSpan'>{precipitationTotal} mm</span>
      <div
        className='precipitationBar'
        style={{ height: barHeight + '%' }}></div>
    </div>
  );
};

export const WeatherListLegend = ({ info }: { info: WeatherLegend }) => {
  const { maxTemp, minTemp, precipitationMax, precipitationMin } = info;
  const stepSize = Math.max(precipitationMax, 10) / 10;
  console.log(stepSize, precipitationMax);

  return (
    <div key='legend' className='fiveDaysWeatherDayContainer'>
      <div className='weatherLegend'>
        <div className='precipitationLegend'>
          {Array(10)
            .fill(1)
            .map((_, i) => (
              <span
                className='levelLine'
                key={i}
                style={{ top: 100 - i * 10 + '%' }}>
                {i % 5 === 0 ? stepSize * i + '-' : '-'}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export const FiveDaysWeatherListElement = ({
  weather,
  selectDate,
  legendInfo,
  selected,
}: {
  weather: FiveDaysWeatherElement;
  selectDate: () => void;
  legendInfo: WeatherLegend;
  selected: boolean;
}) => {
  const { precipitationMax } = legendInfo;
  const { timezoneOffset } = useWaetherIconContext();
  const { weather: weatherDesc, main, dt } = weather;
  const { rain, snow } = getPrecitipation(weather);
  const { icon } = weatherDesc[0];
  const { temp } = main;
  const { hours } = getTimeFromTimezone(timezoneOffset, new Date(dt * 1000));

  return (
    <button
      className={`dayWeatherElement ${selected && 'selected'}`}
      onClick={selectDate}>
      <h3 className='elementHeader'>
        {hours}:00
      </h3>
      <div className='weatherIconContainer'>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt='weather icon'
          className='weatherIcon'
        />
        <span className='temperature'>{temp.toFixed(0)} &deg;</span>
      </div>
      <PrecipitationAmountElemnt
        rain={rain || 0}
        snow={snow || 0}
        precipitationMax={precipitationMax}
      />
    </button>
  );
};
