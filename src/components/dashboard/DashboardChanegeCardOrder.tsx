import { useSortable } from '@dnd-kit/sortable';
import {
  WeatherCardCity,
  useDeleteWeatherCardOrder,
  useUpdateWeatherCardOrder,
} from '../../utilities/useUserWeatherCard';
import { CSSProperties, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortableContext,
  arrayMove,
} from '@dnd-kit/sortable/dist/';
import { User } from '@supabase/supabase-js';
import { useRootStore } from '../../store/store';

type TempOrder = { cityId: number; order: number; cityName: string };
type ChangeOrderCardProps = {
  data: TempOrder;
  activeId?: UniqueIdentifier | null;
  style?: CSSProperties;
};

const ChangeOrderCard = ({ data, style }: ChangeOrderCardProps) => (
  <div className='changeOrderCard' style={style}>
    <p className='order'>{data.order}</p>
    <p>{data.cityName}</p>
  </div>
);

const SortableChangeOrderCard = ({ data, activeId }: ChangeOrderCardProps) => {
  const user = useRootStore((store) => store.session?.session?.user) as User;
  const { mutate, isIdle } = useDeleteWeatherCardOrder(user?.id, data.cityId);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.cityId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`changeOrderCard ${activeId == data.cityId && 'active'}`}>
      <button className='deleteCardBtn' onClick={() => mutate()}>
        {' '}
        x
      </button>
      <p className='order'>{data.order}</p>
      <p>{data.cityName}</p>
    </div>
  );
};
export const DashboardChangeCardOrder = ({
  cardList,
}: {
  cardList: WeatherCardCity[];
}) => {
  const userId = useRootStore(
    (state) => state.session.session?.user.id
  ) as string;
  const [tempOrder, setTempOrder] = useState(cardList);
  const [initialOrder, setInitialOrder] = useState(cardList);
  const [isChange, setIsChange] = useState(false);
  const { mutate, isSuccess, isLoading, isError } = useUpdateWeatherCardOrder(
    userId,
    tempOrder
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const handleOrderChange = () => {
    mutate();
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

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
            disabled={!isChange}>
            change{isChange + ''}
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
