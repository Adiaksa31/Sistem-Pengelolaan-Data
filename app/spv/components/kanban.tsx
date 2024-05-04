'use client'

import React, { useState } from 'react';
import Column from '../components/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function Kanban() {
  const initialColumns = {
    todo: {
      id: 'todo',
      list: [
        { id: 'item-1', text: 'Item 1' },
        { id: 'item-2', text: 'Item 2' },
        { id: 'item-3', text: 'Item 3' }
      ]
    },
    doing: {
      id: 'doing',
      list: []
    },
    done: {
      id: 'done',
      list: []
    }
  };
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Pastikan destinasi yang valid
    if (!destination) return;

    // Pastikan item benar-benar berpindah
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) return;

    // Set variabel awal dan akhir
    const start = columns[source.droppableId as keyof typeof columns];
    const end = columns[destination.droppableId as keyof typeof columns];

    // Jika awal sama dengan akhir, kita berada di kolom yang sama
    if (start === end) {
      // Pindahkan item dalam list
      // Mulai dengan membuat list baru tanpa item yang di-drag
      const newList = Array.from(start.list);
      const [removed] = newList.splice(source.index, 1);

      // Sisipkan item ke lokasi yang benar
      newList.splice(destination.index, 0, removed);

      // Buat salinan baru dari objek kolom
      const newCol = {
        ...start,
        list: newList
      };

      // Perbarui state
      setColumns(state => ({ ...state, [newCol.id]: newCol }));
    } else {
      // Jika awal berbeda dari akhir, kita perlu memperbarui beberapa kolom
      const startList = Array.from(start.list);
      const endList = Array.from(end.list);
      const [removed] = startList.splice(source.index, 1);

      endList.splice(destination.index, 0, removed);

      setColumns(state => ({
        ...state,
        [start.id]: { ...start, list: startList },
        [end.id]: { ...end, list: endList }
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4 m-auto w-4/5 h-4/5">
        {Object.values(columns).map(col => (
          <Column key={col.id} col={col} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Kanban;
