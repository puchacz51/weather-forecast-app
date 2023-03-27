// import { Clouds, Moon, Sun, Wind } from './skyIcons';
import { useWaetherIconContext } from '../utilities/WeatherContext';
import { useRef } from 'react';
import { GroundIcon } from '../components/iconComponents/groundIcons';
import { Wind } from '../components/iconComponents/SkyIcon';
import { SkyIcon } from '../components/iconComponents/SkyIcon';

type IconProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const IconBackGround: React.FC<IconProps> = ({ children }: IconProps) => {
  const { isNight } = useWaetherIconContext();
  console.log(isNight);
  
  return (
    <div className={`CurrentWeatherIconContainer ${isNight && 'night'}`}>
      {children}
    </div>
  );
};

export const CurrentWeatherIcon = () => {
  return (
    <IconBackGround>
      <Wind />
      <SkyIcon />
      <GroundIcon></GroundIcon>
    </IconBackGround>
  );
};
