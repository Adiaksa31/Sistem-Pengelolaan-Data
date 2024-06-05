import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface ItemProps {
  id: string;
  text: string;
  index: number;
}

const Item: React.FC<ItemProps> = ({ id, text, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-2 rounded-md transition duration-200 ease-in-out ${
            snapshot.isDragging ? 'bg-white shadow-md' : 'bg-gray-200'
          }`}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
