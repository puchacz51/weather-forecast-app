import { Link, NavLink, useHref, useLocation } from 'react-router-dom';
import './styles/Header.scss';
import { ProfileInfo } from './components/headerComponents/ProfileInfo';
import { SearchCity } from './components/headerComponents/SearchCity';
import { SingInOptions } from './components/headerComponents/SingInOptions';
import { ToggleSwitch } from './components/headerComponents/ThemeToggleButton';
import { motion } from 'framer-motion';
import { MdDashboard, MdHome } from 'react-icons/md';
import { useRootStore } from './store/store';
export const Header = () => {
  const session = useRootStore((state) => state.session);
  const headerInputIsOpen = useRootStore((state) => state.headerInputIsOpen);
  const setHeaderInputIsOpen = useRootStore(
    (state) => state.setHeaderInputIsOpen
  );
  const { pathname } = useLocation();
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
          onAnimationEnd={() => setHeaderInputIsOpen(!headerInputIsOpen)}>
          <div className='dashboardLinkContainer'>
            {pathname === '/' ? (
              <NavLink
                to='/dashboard'
                className={({ isActive }) =>
                  isActive ? 'active dashboardLink' : 'dashboardLink'
                }>
                <MdDashboard />
              </NavLink>
            ) : (
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? 'active dashboardLink' : 'dashboardLink'
                }>
                <MdHome />
              </NavLink>
            )}
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
