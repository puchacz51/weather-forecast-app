import { Navigate } from 'react-router-dom';
import { AddNewWeatherCard } from './AddNewWeatherCardBtn';
import { useUserWeatherCardQuery } from '../../utilities/useUserWeatherCard';
import { DashBoardWeatherCard } from './DahboardWeatherCard';
import { MotionChangeCardOrder } from './DashboardChanegeCardOrder';
import { useRootStore } from '../../store/store';

const DashboardWeatherCardList = ({ userId }: { userId: string }) => {
  const { data, isFetching, isError, isLoading } =
    useUserWeatherCardQuery(userId);
  if (isFetching || isLoading) return <div className='dashboard'>loading</div>;
  if (!data) return <div className='dashboard'>loading</div>;
  return (
    <div className='weatherCardList'>
      <MotionChangeCardOrder cardList={data} />

      {data.map((weatherCard) => (
        <DashBoardWeatherCard
          cardData={weatherCard}
          cityId={weatherCard.cityId}
          key={weatherCard.cityId}
        />
      ))}
      {data.length < 6 && <AddNewWeatherCard />}
    </div>
  );
};

export const Dashboard = () => {
  const loading = useRootStore((state) => state.loading);
  const session = useRootStore((state) => state.session);
  const user = session?.user;
  if (loading) return <>laoding</>;
  if (!loading && !user) return <Navigate to={'/'} replace />;
  return (
    <div className='dashboard'>
      <DashboardWeatherCardList userId={user?.id as string} />;
    </div>
  );
};
