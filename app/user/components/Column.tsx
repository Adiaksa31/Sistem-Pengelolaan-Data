import React from 'react';
import Item from './Item';
import { Droppable } from 'react-beautiful-dnd';

interface ColumnProps {
  col: {
    id: string;
    list: { id: string; text: string }[]; // Menambahkan id untuk setiap item dalam list
  };
}

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="p-6 flex flex-col mt-8">
          <h2 className="m-0 p-4">{id}</h2>
          <div
            className="bg-gray-300 rounded-lg p-4 flex flex-col flex-grow"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((item, index) => (
              <Item key={item.id} id={item.id} text={item.text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
