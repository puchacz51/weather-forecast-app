import { Link,NavLink} from 'react-router-dom';
import './styles/Header.scss';
import { ProfileInfo } from './components/headerComponents/ProfileInfo';
import { SearchCity } from './components/headerComponents/SearchCity';
import { SingInOptions } from './components/headerComponents/SingInOptions';
import { ToggleSwitch } from './components/headerComponents/ThemeToggleButton';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdDashboard } from 'react-icons/md';
import { useRootStore } from './store/store';
export const Header = () => {
  const [session, loading] = useRootStore((state) => [
    state.session,
    state.loading,
  ]);
  const headerInputIsOpen = useRootStore((state) => state.headerInputIsOpen);
  const [headerElementsIsVisible, setHeaderElementsIsVisible] = useState(
    !headerInputIsOpen
  );

  return (
    <div className='headerWrapper'>
      <header className={`header `}>
        <SearchCity />
        <motion.div
          animate={
            headerInputIsOpen
              ? {
                  opacity: 0,
                  transition: { duration: 0.5 },
                }
              : { opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
          }
          onAnimationEnd={() => setHeaderElementsIsVisible(!headerInputIsOpen)}>
          <div className='dashboardLinkContainer'>
            <NavLink to='/dashboard' className={({isActive})=>isActive?'active dashboardLink':'dashboardLink'} >
              <MdDashboard />
            </NavLink>
          </div>
          <div className='utilsContainer'>
            <ToggleSwitch />
            {session && session?.user ? <ProfileInfo /> : <SingInOptions />}
          </div>
        </motion.div>
      </header>
    </div>
  );
};
