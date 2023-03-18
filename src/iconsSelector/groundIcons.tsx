import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useWeatherContext } from '../utilities/WeatherContext';
import { GiGrass } from 'react-icons/gi';
import tree from './pine.png';
import puddle from './puddle.svg';
import { p } from '../currentWeatherTypes';
type TreeProps = {
  left: number;
};

export const Tree = ({ left }: TreeProps) => {
  const animation = useAnimation();
  const { speed } = useWeatherContext().weather.wind;
  const windSpeed = Math.min(100, Math.ceil(speed));
  const windSpeedPercent = 10 / windSpeed / 100;
  const animationDelay = left * windSpeedPercent;

  useEffect(() => {
    animation.start({
      rotateZ: 5 * windSpeed ** (1 / 2),
      skewY: 15,
      transition: {
        delay: 1 + animationDelay,
        duration: 5 / windSpeed,
        damping: 100,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    });

    return () => {};
  }, []);

  return (
    <div
      className='treeContainer'
      style={{ left: left + '%', bottom: Math.random() * 15 + 50 + '%' }}>
      <motion.div
        className='tree'
        animate={animation}
        initial={{
          position: 'absolute',
          height: '100%',
          skewY: 0,
          transformOrigin: '50% 100%',
          rotateZ: 0,
        }}>
        <img style={{ height: '100%' }} src={tree} alt='' />
      </motion.div>
      <GiGrass className='grass' />
    </div>
  );
};

export const Trees = ({ amount }: { amount: number }) => {
  const {
    iconParams: { groundContainer },
    weather: { wind },
  } = useWeatherContext();
  const { speed, deg } = wind;
  const treeLeftStep = 40 / (amount / 2 + 1);
  const leftTreePositions = new Array(amount / 2)
    .fill(0)
    .map((zero, i) => zero + treeLeftStep * (i + 1));

  const treesLeftPositions = [
    ...leftTreePositions,
    ...leftTreePositions.map((position) => position + 60),
  ];
  return (
    <>
      {treesLeftPositions.map((left) => (
        <Tree left={left} key={left} />
      ))}
    </>
  );
};
export const Puddle = () => {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      width: '20%',
      transition: { duration: 5, delay: 2 },
    });
  });

  return (
    <motion.div
      animate={animation}
      initial={{
        top: '50%',
        left: '50%',
        width: '5%',
        position: 'absolute',
        aspectRatio: 1,
        zIndex: 1000,
        translateX: '-50%',
        translateY: '-50%',
      }}>
      <img src={puddle} className='puddle' />
    </motion.div>
  );
};