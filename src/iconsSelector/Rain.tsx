import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { BsFillDropletFill } from 'react-icons/bs';

type RainDropProps = {
  delayMs: number;
  leftPosition: number;
  speed: number;
};

const RainDrop = ({ delayMs, leftPosition, speed }: RainDropProps) => {
  console.log(leftPosition);

  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      top: '110%',
      left: leftPosition + 'px',
      transition: { repeat: Infinity, duration: speed, delay: delayMs / 10 },
    });
  });
  return (
    <>
      <motion.div
        className='rainDrop'
        animate={animation}
        initial={{
          top: '60%',
          left: leftPosition + 'px',
          position: 'absolute',
          fontSize: 10,
        }}>
        <BsFillDropletFill />
      </motion.div>
    </>
  );
};

export const Rain = ({
  rain,
  cloud,
}: {
  rain: number;
  cloud: React.MutableRefObject<null> | React.MutableRefObject<HTMLDivElement>;
}) => {
  if (cloud.current == null) return <></>;

  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = cloud.current;
  const rainDropAmount = 2 + Math.round(rain) > 8 ? 8 : 2 + Math.round(rain);
  const rainStep = Math.floor(offsetWidth / rainDropAmount);
  console.log(offsetLeft, offsetTop, offsetWidth, offsetHeight, rainStep);

  return (
    <>
      {Array(rainDropAmount)
        .fill(5)
        .map((_, i) => (
          <RainDrop
            speed={Math.min(2, 6 / rain)}
            delayMs={i * Math.random() * rainDropAmount}
            leftPosition={i * rainStep}
          />
        ))}
    </>
  );
};
