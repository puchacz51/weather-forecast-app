import { BsFillCloudsFill } from 'react-icons/bs';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { GiHeavyRain } from 'react-icons/gi';
import { WiBarometer, WiHumidity } from 'react-icons/wi';
import { Link } from 'react-router-dom';
import { useWaetherIconContext } from '../../utilities/WeatherContext';

const DashboardWeatherCardValues = () => {
  const { cloudity, humidity, pressure, rain, snow, windDeg, windSpeed, temp } =
    useWaetherIconContext();

  return (
    <div className='dashboardWeatherCardValues'>
      <div className='dashboardWeatherCardValue'>
        <WiBarometer className='icon' />
        <span className='value'>{pressure} MPA</span>
      </div>

      <div className='dashboardWeatherCardValue'>
        <FaTemperatureHigh className='icon' />
        <span className='value'>{temp.toFixed(1)} &deg;C</span>
      </div>
      <div className='dashboardWeatherCardValue'>
        <GiHeavyRain className='icon' />
        <span className='value'>{rain + snow} mm</span>
      </div>

      <div className='dashboardWeatherCardValue'>
        <FaWind className='icon' />
        <span className='value'>{windSpeed} m/s</span>
      </div>

      <div className='dashboardWeatherCardValue'>
        <WiHumidity className='icon' />
        <span className='value'>{humidity} %</span>
      </div>
      <div className='dashboardWeatherCardValue'>
        <BsFillCloudsFill className='icon' />
        <span className='value'>{cloudity} %</span>
      </div>
    </div>
  );
};

export const DashboardWeatherCardPanel = () => {
  return (
    <div className='dashboardWeatherCardPanel'>
      <DashboardWeatherCardValues />
      <Link className='weatherLink' to={'/'}>
        more{' '}
      </Link>
    </div>
  );
};
