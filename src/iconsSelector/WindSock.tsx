import { motion } from 'framer-motion';
import fanIcon from './fan.png';
const Fan = () => {
  return (
    <motion.span className='fanContainer'>
		
      <img src={fanIcon} alt='' />
    </motion.span>
  );
};

export const WindSock = () => {
  return (
    <div className='windSock'>
      <Fan />
      <div className='stick'></div>
    </div>
  );
};
