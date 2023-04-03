import './styles/weatherCard.scss';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import { GiHeavyRain } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { BsFillCloudsFill } from 'react-icons/bs';
import { useWaetherIconContext } from '../../utilities/WeatherContext';
import { ImArrowUp2 } from 'react-icons/im';

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
      <div className='weatherValuesGroupContainer'>
        <div className='pressure valueWrapper'>
          <span className='pressureValue'>{pressure} MPA</span>
          <div className='iconWrapper'>
            <WiBarometer className='icon' />
          </div>
        </div>

        <div className='valueWrapper temperature'>
          <span className='temperatureValue'>{temp.toFixed(1)} &deg;C</span>
          <div className='iconWrapper'>
            <FaTemperatureHigh className='icon' />
          </div>
        </div>
        <div className='valueWrapper precipitation'>
          <span className='Value'>{rain + snow} mm</span>
          <div className='iconWrapper'>
            <GiHeavyRain className='icon' />
          </div>
        </div>
      </div>

      <div className='weatherValuesGroupContainer windContainer valueWrapper'>
        <span className='windSpeedValue valueWrapper'>
          <span className='Value'>{windSpeed} m/s</span>
          <div className='iconWrapper'>
            <FaWind className='icon' />
          </div>
        </span>
        <div className='windDirectionWrapper'>
          <span className='windLegend n'>
            <span className='letter'>N</span>
          </span>
          <span className='windLegend e'>
            <span className='letter'>E</span>
          </span>
          <span className='windLegend s'>
            <span className='letter'>S</span>
          </span>
          <span className='windLegend w'>
            <span className='letter'>W</span>
          </span>
          <ImArrowUp2
            className='windDirectionIcon'
            style={{ transform: `rotate(${windDeg}deg)` }}
          />
        </div>
      </div>
      <div className='weatherValuesGroupContainer windContainer'>
        <div className='valueWrapper'>
          <span className='Value'>{humidity} %</span>

          <div className='iconWrapper'>
            <WiHumidity className='icon' />
          </div>
        </div>
        <div className='valueWrapper'>
          <span className='Value'>{cloudity} %</span>
          <div className='iconWrapper'>
            <BsFillCloudsFill className='icon' />
          </div>
        </div>
      </div>
      {/* <WeatherValue
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
        name='cloudity'
        unit='%'
        Icon={BsFillCloudsFill}
        value={cloudity}
      /> */}
    </div>
  );
};
