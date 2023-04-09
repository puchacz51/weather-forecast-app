import './Header.scss';
import { ProfileInfo } from './components/headerComponents/ProfileInfo';
import { SearchCity } from './components/headerComponents/SearchCity';
import { SingInOptions } from './components/headerComponents/SingInOptions';
import { ToggleSwitch } from './components/headerComponents/ThemeToggleButton';

export const Header = () => {
  return (
    <div className='wrapper'>
      <header className='header'>
        <SearchCity />
        <div className='utilsContainer'>
          <ToggleSwitch />
          {/* <ProfileInfo /> */}
          <SingInOptions />
        </div>
      </header>
    </div>
  );
};
