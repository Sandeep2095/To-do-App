import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const TodoItem = (props) => {
  const { todos, getEdit, getIdToBeDeleted } = props;
  return todos.map((todoItem, index) => (
    <div key={`${todoItem.id}${index}`} className='todo-item-wrapper'>
      <p className='todo-text'>{todoItem.text}</p>
      <div className='icons'>
        <div>
          <RiCloseCircleLine
            onClick={() => getIdToBeDeleted(todoItem.id)}
            className='delete-icon'
          />
        </div>
        <div>
          <TiEdit
            className='edit-icon'
            onClick={() => getEdit({ id: todoItem.id, text: todoItem.text })}
          />
        </div>
      </div>
    </div>
  ));
};

export default TodoItem;
