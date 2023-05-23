import { BsFillCloudsFill } from 'react-icons/bs';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { GiHeavyRain } from 'react-icons/gi';
import { WiBarometer, WiHumidity } from 'react-icons/wi';
import { Link } from 'react-router-dom';
import { useWaetherIconContext } from '../../utilities/WeatherContext';
import { motion } from 'framer-motion';
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

export const DashboardWeatherCardPanel = ({ cityId }: { cityId: number }) => {
  return (
    <motion.div
      transition={{ duration: 0.3 }}
      key={`${cityId}dashboardCard`}
      className='dashboardWeatherCardPanel'
      initial={{ height: '0px', overflow: 'hidden', opacity: 0.5 }}
      exit={{ height: '0px' }}
      animate={{ height: 'min-content', opacity: 1 }}>
      <DashboardWeatherCardValues />
      <Link className='weatherLink' to={`/weather/${cityId}/current`}>
        more{' '}
      </Link>
    </motion.div>
  );
};
