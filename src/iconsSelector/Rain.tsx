import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { BsFillDropletFill } from 'react-icons/bs';

import { IoMdSnow } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { useWeatherContext } from '../utilities/WeatherContext';
type DroppedElementsTypes = 'rain' | 'snow';
type DroppedElements = {
  [key: string]: {
    Icon: IconType;
    animationParams: {string:string|number}|{};
  };
};
const droppedElements: DroppedElements = {
  rain: { Icon: BsFillDropletFill, animationParams: {} },

  snow: { Icon: IoMdSnow, animationParams: { rotate: 180 } },
};

type RainDropProps = {
  delayMs: number;
  leftPosition: number;
  speed: number;
  element: DroppedElementsTypes;
};

const DroppedElement = ({
  delayMs,
  leftPosition,
  speed,
  element,
}: RainDropProps) => {
  const { Icon,animationParams } = droppedElements[element];
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      top: '110%',
      left: leftPosition + 'px',
      transition: { repeat: Infinity, duration: speed, delay: delayMs / 10 },
      ...animationParams,
    });
  });
  return (
    <>
      <motion.div
        className={element}
        animate={animation}
        initial={{
          top: '60%',
          left: leftPosition + 'px',
          position: 'absolute',
          fontSize: 10,
        }}>
        <Icon className={element} />
      </motion.div>
    </>
  );
};
const getPercipitationList = (rain: number, snow: number) => {
  const precipitationAmount =
    2 + Math.round(rain + snow) > 8 ? 8 : 2 + Math.round(rain + snow);
  const rainDropAmount = Math.floor(
    (precipitationAmount * rain) / (snow + rain)
  );
  const SnowFlakesAmount = precipitationAmount - rainDropAmount;
  const [firstElement, secondElement] =
    rain > snow ? ['rain', 'snow'] : ['snow', 'rain'];
  let secondElemntAmount =
    firstElement === 'rain' ? SnowFlakesAmount : rainDropAmount;
  console.log(SnowFlakesAmount, rainDropAmount);

  const precipitationList = Array(precipitationAmount)
    .fill(0)
    .map((_, i) =>
      i % 2
        ? secondElement
        : secondElemntAmount-- >= 0
        ? secondElement
        : firstElement
    ) as DroppedElementsTypes[];

  return precipitationList;
};

export const Rain = ({
  cloud,
}: {
  cloud: React.MutableRefObject<null> | React.MutableRefObject<HTMLDivElement>;
}) => {
  const {
    main: { rain = 0, snow = 0 },
  } = useWeatherContext().weather;

  if (cloud.current == null || (!rain && !snow)) return <></>;

  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = cloud.current;
  const precipitationList = getPercipitationList(rain, snow);
  const precipitationAmount = precipitationList.length;
  const rainStep = Math.floor(offsetWidth / precipitationAmount);
  console.log(precipitationList, rain, snow);

  //   console.log(offsetLeft, offsetTop, offsetWidth, offsetHeight, rainStep);

  return (
    <>
      {precipitationList.map((element, i) => (
        <DroppedElement
          speed={Math.min(2, 6 / rain + snow)}
          delayMs={i * Math.random() * precipitationAmount}
          leftPosition={i * rainStep}
          element={element}
        />
      ))}
    </>
  );
};
