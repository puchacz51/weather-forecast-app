import { useSortable } from '@dnd-kit/sortable';
import {
  WeatherCardCity,
  useDeleteWeatherCardOrder,
  useUpdateWeatherCardOrder,
} from '../../utilities/useUserWeatherCard';
import { CSSProperties, useState, MouseEvent, useEffect } from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  verticalListSortingStrategy,
  SortableContext,
  arrayMove,
} from '@dnd-kit/sortable/dist/';
import { User } from '@supabase/supabase-js';
import { useRootStore } from '../../store/store';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { AiFillSave } from 'react-icons/ai';
import { LoadingSpinner } from '../LoadingSpinner';
import { motion } from 'framer-motion';
import { maxNameLength } from '../../utilities/maxNameLength';
type TempOrder = { cityId: number; order: number; cityName: string };
type ChangeOrderCardProps = {
  data: TempOrder;
  activeId?: UniqueIdentifier | null;
  style?: CSSProperties;
};

const ChangeOrderCard = ({ data, style }: ChangeOrderCardProps) => (
  <div className='changeOrderCard' style={style}>
    <p className='order'>{data.order}</p>
    <p>
      {data.cityName.length > 10
        ? data.cityName.slice(0, 7) + '...'
        : data.cityName}
    </p>
  </div>
);

const SortableChangeOrderCard = ({ data, activeId }: ChangeOrderCardProps) => {
  const user = useRootStore((store) => store.session?.user) as User;
  const { mutate, isIdle } = useDeleteWeatherCardOrder(user?.id, data.cityId);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.cityId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const deleteCardHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('aasds');
    mutate();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`changeOrderCard ${activeId == data.cityId && 'active'}`}>
      <button className='deleteCardBtn' onClick={deleteCardHandler}>
        {' '}
        x
      </button>
      <p className='order'>{data.order}</p>
      <p> {maxNameLength(data.cityName, 8)}</p>
      <div className='iconWrapper'>
        <TiWeatherPartlySunny className='icon' />
      </div>
    </div>
  );
};
export const DashboardChangeCardOrder = ({
  cardList,
}: {
  cardList: WeatherCardCity[];
}) => {
  const userId = useRootStore((state) => state.session?.user.id) as string;
  const [tempOrder, setTempOrder] = useState(cardList);
  const [initialOrder] = useState(cardList);
  const [isChange, setIsChange] = useState(false);
  const { mutate, isSuccess, isLoading, isError } = useUpdateWeatherCardOrder(
    userId,
    tempOrder
  );
  useEffect(() => {
    setTempOrder((state) =>
      state.map((temp, i) => ({ ...temp, order: i + 1 }))
    );
  }, cardList);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const handleOrderChange = () => {
    mutate();
  };
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 2 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 2 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}>
      <SortableContext
        items={tempOrder.map((temp) => temp.cityId)}
        strategy={verticalListSortingStrategy}>
        <div className='dashboardChangeOrderContainer'>
          <DragOverlay style={{ width: '30%' }}>
            {activeId ? (
              <ChangeOrderCard
                style={{ width: '100%', background: 'red' }}
                data={
                  tempOrder.find(
                    (data) => data.cityId === activeId
                  ) as TempOrder
                }
              />
            ) : null}
          </DragOverlay>
          {tempOrder.map((tempOrder) => (
            <SortableChangeOrderCard
              key={tempOrder.cityId}
              activeId={activeId}
              data={tempOrder}
            />
          ))}

          <button
            className='changeOrderBtn'
            onClick={handleOrderChange}
            disabled={!isChange || isLoading}>
            {isLoading ? <LoadingSpinner /> : <AiFillSave />}
          </button>
        </div>
      </SortableContext>
    </DndContext>
  );
  function checkIsChange() {
    for (const initCard of initialOrder) {
      const tempCard = tempOrder.find(
        (tempCard) => tempCard.cityId === initCard.cityId
      );
      if (initCard.order !== tempCard?.order) return true;
    }
    return false;
  }
  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id);
  }
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (active.id !== over?.id) {
      setTempOrder((items) => {
        const oldIndex = items.findIndex((card) => card.cityId == active.id);
        const newIndex = items.findIndex((card) => card.cityId == over?.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        return newOrder.map((item, i) => ({ ...item, order: i + 1 }));
      });
    }
    setActiveId(null);
    setIsChange(checkIsChange);
  }
  function handleDragMove(e: DragMoveEvent) {
    const { active, over } = e;
    if (active.id !== over?.id) {
      setTempOrder((items) => {
        const oldIndex = items.findIndex((card) => card.cityId == active.id);
        const newIndex = items.findIndex((card) => card.cityId == over?.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        return newOrder.map((item, i) => ({ ...item, order: i + 1 }));
      });
    }
  }
};

export const MotionChangeCardOrder = ({
  cardList,
}: {
  cardList: WeatherCardCity[];
}) => {
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      animate={{ height: 'min-content' }}
      initial={{ height: '0px', width: '100%', overflow: 'hidden' }}
      exit={{ height: '20px', overflow: 'hidden', fontSize: '100px' }}>
      <DashboardChangeCardOrder cardList={cardList} />
    </motion.div>
  );
};
