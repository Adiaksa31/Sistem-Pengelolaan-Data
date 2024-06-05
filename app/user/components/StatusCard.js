import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  ORDER: 'order',
};

const orders = [
  { id: 1, nama: "Pesanan 1", keterangan: "Keterangan Pesanan 1", tanggal: "10 Januari", status: "Pending" },
  { id: 2, nama: "Pesanan 2", keterangan: "Keterangan Pesanan 2", tanggal: "11 Januari", status: "Pending" },
  { id: 3, nama: "Pesanan 3", keterangan: "Keterangan Pesanan 3", tanggal: "12 Januari", status: "Proses" },
  { id: 4, nama: "Pesanan 4", keterangan: "Keterangan Pesanan 4", tanggal: "13 Januari", status: "Selesai" },
  { id: 5, nama: "Pesanan 5", keterangan: "Keterangan Pesanan 5", tanggal: "14 Januari", status: "Batal" },
];

const KanbanBoard = () => {
  const [items, setItems] = useState(orders);

  const moveOrder = (dragIndex, hoverIndex, targetStatus) => {
    const dragOrder = items[dragIndex];
    const newItems = [...items];
    dragOrder.status = targetStatus;
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragOrder);
    setItems(newItems);
  };

  const Order = ({ order, index }) => {
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

  const Column = ({ status }) => {
    const [, drop] = useDrop({
      accept: ItemTypes.ORDER,
      drop(item, monitor) {
        const dragIndex = item.index;
        const hoverIndex = orders.findIndex((order) => order.status === status);
        moveOrder(dragIndex, hoverIndex, status);
      },
    });

    return (
      <div ref={drop} className="flex flex-col w-full p-3 bg-gray-100 shadow rounded">
        <h1 className="text-lg font-bold pb-3">{status} ({items.filter(order => order.status === status).length})</h1>
        {items.map((order, index) => {
          if (order.status === status) {
            return <Order key={order.id} order={order} index={index} />;
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
        <Column status="Pending" />
        <Column status="Proses" />
        <Column status="Selesai" />
        <Column status="Batal" />
      </div>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
