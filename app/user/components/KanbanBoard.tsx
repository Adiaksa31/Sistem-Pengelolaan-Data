"use client";
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Order } from '../../../types/Order';
import { toast } from "@/components/ui/use-toast";
import { getToken } from "../components/TokenComponent";
import ShowPesan from "./showPesan";
import { HiExclamationCircle } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { HiCalendar } from "react-icons/hi";

const ItemTypes = {
  ORDER: 'order',
};

interface KanbanBoardProps {
  initialOrders: Order[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialOrders }) => {
  const [items, setItems] = useState<Order[]>(initialOrders);
  const token = getToken(); // Retrieve the token

  useEffect(() => {
    if (initialOrders.length > 0) {
      setItems(initialOrders);
    }
  }, [initialOrders]);

  const updateOrderStatus = async (orderId: number, status_kontak: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/pesanan/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ id: orderId, status_kontak }),
      });
      const data = await res.json();
      if (data.status === 'error') {
        console.error('Failed to update order status:', data.message);
      }
      else{
        const orderName = items.find(item => item.id === orderId)?.nama || 'Pesanan';
        toast({ title: `Status pesan ${orderName} diupdate menjadi "${status_kontak}"`, variant: 'berhasil' });
        console.log(data);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const moveOrder = (dragIndex: number, hoverIndex: number, targetStatus: string) => {
    const dragOrder = items[dragIndex];
    const newItems = [...items];
    const updatedOrder = { ...dragOrder, status: targetStatus };
    newItems.splice(dragIndex, 1, updatedOrder);
    setItems(newItems);
    updateOrderStatus(dragOrder.id, targetStatus); 
  };

  const OrderComponent: React.FC<{ order: Order, index: number }> = ({ order, index }) => {
    console.log('Order data:', order); 
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.ORDER,
      item: { type: ItemTypes.ORDER, id: order.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const formattedOrderTanggal = new Date(order.tanggal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    
    return (
      <div ref={drag} className={`bg-white p-3 shadow rounded mb-2 ${isDragging ? 'opacity-50' : ''}`}> 
        <div className='bg-gray-200 w-auto rounded'>
        <p className="text-sm px-2 p-1"><strong>Nama:</strong> {order.nama}</p> 
        <p className="text-sm px-2 "><strong>Kategori:</strong> {order.kategori}</p>
        <p className="text-sm px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap md:overflow-visible md:text-normal md:whitespace-normal lg:text-normal lg:whitespace-normal xl:text-normal xl:whitespace-normal"><strong>Keterangan:</strong> {order.keterangan}</p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="flex items-center gap-1 text-sm"><strong><HiUser className='text-D32124' /></strong>{order.tujuan_user.nama}</p>
            <p className="flex items-center gap-1 text-sm"><strong><HiCalendar className='text-D32124' /></strong>{formattedOrderTanggal}</p>
          </div>
          <ShowPesan pesanan={order}/>
        </div>
      </div>
    );
  };

  const Column: React.FC<{ status: string }> = ({ status }) => {
    const [, drop] = useDrop({
      accept: ItemTypes.ORDER,
      drop(item: { index: number; id: number }) {
        const dragIndex = item.index;
        const hoverIndex = items.findIndex((order) => order.status === status);
        moveOrder(dragIndex, hoverIndex, status);
      },
    });

    return (
      <div ref={drop} className="flex flex-col w-full p-3 bg-gray-200 shadow rounded">
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
      <div className="kanban px-10">
      <p className="p-2 flex items-center text-gray-600 text-xs italic"><HiExclamationCircle /> Geser untuk merubah status pesan/kontak.</p>
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
