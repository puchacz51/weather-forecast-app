import './Header.scss';
import { SearchCity } from './components/headerComponents/SearchCity';
import { ToggleSwitch } from './components/headerComponents/ThemeToggleButton';


export const Header = () => {
  return (
    <div className='wrapper'>
      <header className='header'>
        <SearchCity />
        <ToggleSwitch />
      </header>
    </div>
  );
};
