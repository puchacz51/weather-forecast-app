import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useWeatherContext } from '../utilities/WeatherContext';
import { GiGrass } from 'react-icons/gi';
import tree from './pine.png';
type TreeProps = {
  left: number;
};

export const Tree = ({ left }: TreeProps) => {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      rotateZ: 20,
      skewY: 15,
      transition: {
        delay: 1,
        duration: 2,
        damping: 30,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    });

    return () => {};
  }, []);

  return (
    <div
      className='treeContainer'
      style={{ left: left + '%', bottom: Math.random() * 10 + 60 + '%' }}>
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
