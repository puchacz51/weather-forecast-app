// import { Clouds, Moon, Sun, Wind } from './skyIcons';
import { useWaetherIconContext } from '../../../utilities/WeatherContext';
import { useRef } from 'react';
import { GroundIcon } from '../iconComponents/groundIcons';
import { Wind } from '../iconComponents/SkyIcon';
import { SkyIcon } from '../iconComponents/SkyIcon';

type IconProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const IconBackGround: React.FC<IconProps> = ({ children }: IconProps) => {
  const { isNight } = useWaetherIconContext();
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
