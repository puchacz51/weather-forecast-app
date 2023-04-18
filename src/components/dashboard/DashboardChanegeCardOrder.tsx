import { useSortable } from '@dnd-kit/sortable';
import {
  WeatherCardCity,
  useUpdateWeatherCardOrder,
} from '../../utilities/useUserWeatherCard';
import { useState } from 'react';
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
import { useUserStore } from '../../store/userStore';

type TempOrder = { cityId: number; order: number; cityName: string };
type ChangeOrderCardProps = {
  data: TempOrder;
};

const ChangeOrderCard = ({ data }: ChangeOrderCardProps) => (
  <div className='changeOrderCard'>
    <p className='order'>{data.order}</p>
    <p>{data.cityName}</p>
  </div>
);

const SortableChangeOrderCard = ({ data }: ChangeOrderCardProps) => {
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
      className='changeOrderCard'>
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
  const userId = useUserStore((state) => state.session?.user.id) as string;
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
          <DragOverlay>
            {activeId ? (
              <ChangeOrderCard
                data={
                  tempOrder.find(
                    (data) => data.cityId === activeId
                  ) as TempOrder
                }
              />
            ) : null}
          </DragOverlay>
          {tempOrder.map((tempOrder) => (
            <SortableChangeOrderCard key={tempOrder.cityId} data={tempOrder} />
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
