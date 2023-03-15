import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useWeatherContext } from '../utilities/WeatherContext';
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
    <motion.div
      className=''
      animate={animation}
      initial={{
        left: left + '%',
        height: '90%',
        position: 'absolute',
        bottom: Math.random() * 10 + 60 + '%',
        skewY: 0,
        transformOrigin: '50% 100%',
        rotateZ: 0,
        translateX: '-50%',
      }}>
      <img style={{ height: '100%' }} src={tree} alt='' />
    </motion.div>
  );
};

export const Trees = ({ amount }: { amount: number }) => {
  const {
    iconParams: { groundContainer },
    weather: { wind },
  } = useWeatherContext();
  const { speed, deg } = wind;
  const treeLeftStep = 100 / (amount + 1);
  const treesLeftPositions = new Array(amount)
    .fill(0)
    .map((zero, i) => zero + treeLeftStep * (i + 1));
  return (
    <>
      {treesLeftPositions.map((left) => (
        <Tree left={left} key={left} />
      ))}
    </>
  );
};
