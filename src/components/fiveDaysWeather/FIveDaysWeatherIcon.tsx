import { CloudsContainer, RainyCloud } from './Clouds';
import { SunMoonCircle } from './SkyIcon';
import { useState } from 'react';
export const FiveDaysWeatherIcon = () => {
  return (
    <div className='fiveDaysWeatherIcon '>
      <SunMoonCircle />
      <CloudsContainer />
    </div>
  );
};
