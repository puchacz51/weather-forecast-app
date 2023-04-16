import './dashboard.scss';
import { useUserStore } from '../../store/userStore';
import { Navigate } from 'react-router-dom';
import { AddNewWeatherCard } from './AddNewWeatherCardBtn';
import { useUserWeatherCardQuery } from '../../utilities/useUserWeatherCard';
import { DashBoardWeatherCard } from './DahboardWeatherCard';
import { BsFillGearFill } from 'react-icons/bs';
// const testData = {
//   coord: { lon: 18, lat: 53.12 },
//   weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
//   base: 'stations',
//   main: {
//     temp: 8.12,
//     feels_like: 8.12,
//     temp_min: 7.16,
//     temp_max: 10.97,
//     pressure: 1020,
//     humidity: 81,
//     sea_level: 21,
//     grnd_level: 232,
//   },
//   visibility: 10000,
//   wind: { speed: 1.03, deg: 110, gust: 3 },
//   clouds: { all: 0 },
//   dt: 1681158337,
//   sys: {
//     type: 1,
//     id: 1688,
//     country: 'PL',
//     sunrise: 1681099281,
//     sunset: 1681148224,
//   },
//   timezone: 7200,
//   id: 3102014,
//   name: 'Bydgoszcz',
//   cod: 200,
// } as CurrentWeather;

const DashboardWeatherCardList = ({ userId }: { userId: string }) => {
  const { data, isFetching, isError, isLoading } =
    useUserWeatherCardQuery(userId);

  if (isFetching || isLoading) return <div className='dashboard'>loading</div>;

  if (!data) return <div className='dashboard'>loading</div>;

  return (
    <div className='weatherCardList'>
      {data.map((weatherCard) => (
        <DashBoardWeatherCard cardData={weatherCard} key={weatherCard.cityId} />
      ))}
      {data.length < 4 && <AddNewWeatherCard />}
    </div>
  );
};

export const Dashboard = () => {
  const { loading, session } = useUserStore((state) => state);
  const user = session?.user;
  if (loading) return <>laoding</>;
  if (!loading && !user) return <Navigate to={'/'} replace />;
  return (
    <div className='dashboard'>
      <div className='dashboardHeader'>
        <h2 className='dashboardTitle'>your weather</h2>
        <button className='dashboardModifyBtn'>
          <BsFillGearFill />
        </button>
      </div>
      <DashboardWeatherCardList userId={user?.id as string} />;
    </div>
  );
};
