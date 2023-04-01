import './styles/weatherCard.scss';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import { GiHeavyRain } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { BsFillCloudsFill } from 'react-icons/bs';
import { useWaetherIconContext } from '../../utilities/WeatherContext';

type WeatherValueProps = {
  name: string;
  value: number | string | null;
  unit: string;
  Icon: IconType;
};
const WeatherValue = ({ name, value, unit, Icon }: WeatherValueProps) => {
  return (
    <div className={`weatherValue`}>
      <div className='iconContainer '>
        <Icon className='icon' size='100%' />
      </div>
      <span className='name'>{name} : </span>
      <span className='value'>{`${value} ${unit}`}</span>
    </div>
  );
};

export const WeatherValues = () => {
  const { cloudity, humidity, pressure, rain, snow, windDeg, windSpeed, temp } =
    useWaetherIconContext();
    
    return (
      <div className='weatherValues'>
        <div className='temperature'>


        </div>

        <WeatherValue
          name='temperature'
          unit='*C'
          value={temp}
          Icon={FaTemperatureHigh}
        />
        <WeatherValue
          name='Humidity'
          unit='%'
          value={humidity}
          Icon={WiHumidity}
        />
        <WeatherValue
          name='pressure'
          unit='Hpa'
          value={pressure}
          Icon={WiBarometer}
        />
        <WeatherValue
          name='wind speed'
          unit='m/s'
          value={windSpeed}
          Icon={FaWind}
        />
        <WeatherValue
          name='precipitation'
          unit='mm'
          Icon={GiHeavyRain}
          value={(rain || 0) + (snow || 0)}
        />
        <WeatherValue
          name='cloudity'
          unit='%'
          Icon={BsFillCloudsFill}
          value={cloudity}
        />
      </div>
    );
};
