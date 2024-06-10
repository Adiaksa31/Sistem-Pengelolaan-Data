"use client";
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop, ConnectDragSource } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Order } from '../../../types/Order';

const ItemTypes = {
  ORDER: 'order',
};

interface KanbanBoardProps {
  initialOrders: Order[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialOrders }) => {
  const [items, setItems] = useState<Order[]>(initialOrders);

  useEffect(() => {
    // Set the state with initialOrders when it's available
    if (initialOrders.length > 0) {
      setItems(initialOrders);
    }
  }, [initialOrders, items]);

  const moveOrder = (dragIndex: number, hoverIndex: number, targetStatus: string) => {
    const dragOrder = items[dragIndex];
    const newItems = [...items];
    dragOrder.status = targetStatus;
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragOrder);
    setItems(newItems);
  };

  const OrderComponent: React.FC<{ order: Order, index: number }> = ({ order, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.ORDER,
      item: { type: ItemTypes.ORDER, id: order.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div ref={drag} className={`bg-white p-3 shadow rounded-lg mb-2 ${isDragging ? 'opacity-50' : ''}`}>
        <p className="font-bold text-sm">{order.nama}</p>
        <p className="text-xs text-gray-500">{order.keterangan}</p>
        <p className="text-xs text-gray-500">Tanggal: {order.tanggal}</p>
        <p className="text-xs text-gray-500">Status: {order.status}</p>
      </div>
    );
  };

  const Column: React.FC<{ status: string }> = ({ status }) => {
    const [, drop] = useDrop({
      accept: ItemTypes.ORDER,
      drop(item: { index: number; id: number }, monitor) {
        const dragIndex = item.index;
        const hoverIndex = items.findIndex((order) => order.status === status);
        moveOrder(dragIndex, hoverIndex, status);
      },
    });

    return (
      <div ref={drop} className="flex flex-col w-full p-3 bg-gray-100 shadow rounded">
        <h1 className="text-lg font-bold pb-3">{status} ({items.filter(order => order.status === status).length})</h1>
        {items.map((order, index) => {
          if (order.status === status) {
            return <OrderComponent key={order.id} order={order} index={index} />;
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban px-10 ">
        <div className="flex gap-x-2 md:gap-x-0 w-full space-x-2">
          <Column status="pending" />
          <Column status="proses" />
          <Column status="selesai" />
          <Column status="batal" />
        </div>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
