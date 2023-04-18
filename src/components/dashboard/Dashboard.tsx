import { useUserStore } from '../../store/userStore';
import { Navigate } from 'react-router-dom';
import { AddNewWeatherCard } from './AddNewWeatherCardBtn';
import { useUserWeatherCardQuery } from '../../utilities/useUserWeatherCard';
import { DashBoardWeatherCard } from './DahboardWeatherCard';
import { BsFillGearFill } from 'react-icons/bs';
import { DashboardChangeCardOrder } from './DashboardChanegeCardOrder';

const DashboardWeatherCardList = ({ userId }: { userId: string }) => {
  const { data, isFetching, isError, isLoading } =
    useUserWeatherCardQuery(userId);
  if (isFetching || isLoading) return <div className='dashboard'>loading</div>;
  if (!data) return <div className='dashboard'>loading</div>;
  return (
    <div className='weatherCardList'>
      <DashboardChangeCardOrder cardList={data} />

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
