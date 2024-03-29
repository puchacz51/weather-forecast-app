import { motion } from 'framer-motion';
import { useRootStore } from '../../store/store';
export const ToggleSwitch = () => {
  const [theme, setTheme] = useRootStore((state) => [
    state.theme,
    state.setTheme,
  ]);
  const switchOnAnimation = {
    backgroundColor: '#00ccff',
    translateX: '100%',
    transition: {
      duration: 0.5,
    },
  };
  const switchOFFAnimation = {
    backgroundColor: '#3cff00',
    translateX: '0%',
    transition: {
      duration: 0.5,
    },
  };

  const toggleSwitch = () => {
    setTheme(theme === 'DARK' ? 'LIGHT' : 'DARK');
  };

  return (
    <div className='switchContainer'>
      <motion.div
        className='toggleElement'
        onClick={toggleSwitch}
        initial={{
          translateY: '-50%',
          left: 0,
        }}
        animate={
          theme === 'DARK' ? switchOnAnimation : switchOFFAnimation
        }></motion.div>
    </div>
  );
};
