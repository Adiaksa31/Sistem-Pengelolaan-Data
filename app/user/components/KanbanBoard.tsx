"use client";
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Order } from '../../../types/Order';
import { toast } from "@/components/ui/use-toast";
import { getToken } from "../components/TokenComponent";
import ShowPesan from "./showPesan";

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
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const moveOrder = (dragIndex: number, hoverIndex: number, targetStatus: string) => {
    const dragOrder = items[dragIndex];
    const newItems = [...items];
    const updatedOrder = { ...dragOrder, status: targetStatus }; // Update only the status
    newItems.splice(dragIndex, 1, updatedOrder);
    setItems(newItems);
    updateOrderStatus(dragOrder.id, targetStatus); // Update the order status in the backend
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
      <div ref={drag} className={`bg-white p-3 shadow rounded-lg mb-2 ${isDragging ? 'opacity-50' : ''}`}>
       <div className="flex justify-between items-center">
          <p className="font-bold text-sm">{order.nama}</p>
          <ShowPesan pesanan={order}/>
        </div>
        <p className="text-xs text-gray-500">Keterangan: {order.keterangan}</p>
        <p className="text-xs text-gray-500">Tanggal: {formattedOrderTanggal}</p>
        <p className="text-xs text-gray-500">Status: {order.status}</p>
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
      <div className="kanban px-10">
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
