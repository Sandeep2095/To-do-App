import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchParam, setSearchParam] = useState('');

  const handleModifyTodos = (getLatestTodoItemDetails) => {
    const newTodos = [...todos];
    const indexTodoItem = newTodos.findIndex(
      (item) => item.id === getLatestTodoItemDetails.id
    );

    if (indexTodoItem === -1) {
      newTodos.push(getLatestTodoItemDetails);
    } else {
      console.log(indexTodoItem, getLatestTodoItemDetails);
      newTodos[indexTodoItem] = {
        ...newTodos[indexTodoItem],
        text: getLatestTodoItemDetails.text,
      };
    }
    setTodos(newTodos);
    localStorage.setItem('todoList', JSON.stringify(newTodos));
  };
  const getEdit = (editedData) => {
    setEditData(editedData);
  };

  const onDelete = (IdToBeDeleted) => {
    let updatedTodos = [...todos];
    updatedTodos = updatedTodos.filter((item) => item.id !== IdToBeDeleted);
    setTodos(updatedTodos);
    localStorage.setItem('todoList', JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    const extractTodosFromLS = JSON.parse(localStorage.getItem('todoList'));
    if (extractTodosFromLS && extractTodosFromLS.length)
      setTodos(extractTodosFromLS);
  }, []);

  const onSearch = (event) => {
    const { value } = event.target;
    setSearchParam(value.toLowerCase());
  };

  const filteredtodos =
    todos && todos.length
      ? todos.filter((item) => item.text.toLowerCase().includes(searchParam))
      : [];

  return (
    <div className='todo-list'>
      <div className='search-todos-input-wrapper'>
        <h3>TO-DO APP</h3>
        <input
          className='search-input'
          type='text'
          name='search'
          placeholder='Search here . . .'
          onChange={onSearch}
          value={searchParam}
          required
        />
      </div>
      <TodoForm editData={editData} NewTodoItem={handleModifyTodos} />
      {filteredtodos && filteredtodos.length ? (
        <TodoItem
          getIdToBeDeleted={onDelete}
          getEdit={getEdit}
          todos={filteredtodos}
        />
      ) : (
        <div className='no-todo'>No data found</div>
      )}
    </div>
  );
};

export default TodoList;
