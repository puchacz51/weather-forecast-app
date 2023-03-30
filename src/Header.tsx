import './Header.scss';
import { SearchCity } from './components/headerComponents/SearchCity';

const ThemeSwitch = () => {
  return <button></button>;
};

export const Header = () => {
  return (
    <div className='wrapper'>
      <header className='header'>
        <SearchCity />
      </header>
    </div>
  );
};
