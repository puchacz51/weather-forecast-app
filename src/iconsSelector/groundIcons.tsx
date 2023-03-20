import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useWeatherContext } from '../utilities/WeatherContext';
import { GiGrass } from 'react-icons/gi';
import { IoCloudSharp } from 'react-icons/io5';
import tree from './pine.png';
import snowHill from './snow.png';
import snowTree from './snowTree.png';
import puddle from './puddle.svg';
type TreeProps = {
  left: number;
};

export const Tree = ({ left }: TreeProps) => {
  const animation = useAnimation();
  const { windSpeed, isSnowy } = useWeatherContext().iconParams;

  const windSpeedPercent = 10 / windSpeed / 100;
  const animationDelay = left * windSpeedPercent;

  useEffect(() => {
    if (windSpeed > 2) {
      animation.start({
        rotateZ: 5 * windSpeed ** (1 / 2),
        skewY: 5 * windSpeed ** (1 / 2),
        transition: {
          delay: 1 + animationDelay,
          duration: 10 / windSpeed,
          damping: 100,
          repeat: Infinity,
          repeatType: 'mirror',
        },
      });
    }
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
        <img
          style={{ height: '100%' }}
          src={isSnowy ? snowTree : tree}
          alt=''
        />
      </motion.div>
      {isSnowy ? (
        <IoCloudSharp className='snowTrunk' />
      ) : (
        <GiGrass className='grass' />
      )}
    </div>
  );
};

export const Trees = ({ amount }: { amount: number }) => {
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
export const PrecipitationResult = () => {
  const { isSnowy, rain, snow } = useWeatherContext().iconParams;
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      width: '20%',
      transition: { duration: 5, delay: 2 },
    });
  });
  if (!(snow && rain)) return <></>;

  const type = isSnowy ? snowHill : puddle;

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
      <img src={type} className='puddle' />
    </motion.div>
  );
};
