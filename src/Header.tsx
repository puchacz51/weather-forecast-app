import './Header.scss';
import { ProfileInfo } from './components/headerComponents/ProfileInfo';
import { SearchCity } from './components/headerComponents/SearchCity';
import { SingInOptions } from './components/headerComponents/SingInOptions';
import { ToggleSwitch } from './components/headerComponents/ThemeToggleButton';
import { useUserStore } from './store/userStore';

export const Header = () => {
  const { session, loading } = useUserStore();
  return (
    <div className='headerWrapper'>
      <header className='header'>
        <SearchCity />
        <div className='utilsContainer'>
          <ToggleSwitch />
          {/* <ProfileInfo /> */}

          {session && session?.user ? <ProfileInfo /> : <SingInOptions />}
        </div>
      </header>
    </div>
  );
};
