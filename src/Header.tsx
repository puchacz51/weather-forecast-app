import { Link } from 'react-router-dom';
import './Header.scss';
import { ProfileInfo } from './components/headerComponents/ProfileInfo';
import { SearchCity } from './components/headerComponents/SearchCity';
import { SingInOptions } from './components/headerComponents/SingInOptions';
import { ToggleSwitch } from './components/headerComponents/ThemeToggleButton';
import { useUserStore } from './store/userStore';
import { useWaeatherStore } from './store/store';

export const Header = () => {
  const { session, loading } = useUserStore();
  const { headerInputIsOpen } = useWaeatherStore();

  return (
    <div className='headerWrapper'>
      <header className={`header ${headerInputIsOpen && 'inputOpen'}`}>
        <SearchCity />
        <div className='dashboardLinkContainer'>
          <Link to='/dashboard' className='dashboardLink'>
            Weather
          </Link>
        </div>
        <div className='utilsContainer'>
          <ToggleSwitch />
          {session && session?.user ? <ProfileInfo /> : <SingInOptions />}
        </div>
      </header>
    </div>
  );
};
