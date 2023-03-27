import { FiveDaysWeatherElement } from '../../WeatherTypes';

type WeatherLegend = {
  minTemp: number;
  maxTemp: number;
  precipitationMin: number;
  precipitationMax: number;
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
}: {
  weather: FiveDaysWeatherElement;
  selectDate: () => void;
  legendInfo: WeatherLegend;
}) => {
  const { precipitationMax } = legendInfo;
  const {
    dt_txt,
    weather: weatherDesc,
    main,
    rain = { '3h': 0 },
    snow = { '3h': 0 },
  } = weather;

  const { icon } = weatherDesc[0];
  const { temp } = main;
  const [hours] = dt_txt.split(' ')[1].split(':');
  const precipitationBarHeight =
    Math.ceil((rain['3h'] + snow['3h']) / Math.max(precipitationMax, 10)) * 10;

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
      <div className='precipitation'>
        <div
          className='precipitationQuantityBar'
          style={{ height: precipitationBarHeight + '%' }}></div>
      </div>
    </button>
  );
};
