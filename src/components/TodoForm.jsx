import React, { useEffect, useState } from 'react';

const TodoForm = (props) => {
  const { NewTodoItem, editData } = props;
  const [inputValue, setInputValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const onChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: isEdit ? editData.id : Math.floor(Math.random() * 1000),
      text: inputValue,
    };
    NewTodoItem(newTodo);
    setInputValue('');
    setIsEdit(false);
  };

  useEffect(() => {
    if (editData && Object.keys(editData).lenght !== 0) {
      setInputValue(editData.text);
      setIsEdit(true);
    }
  }, [editData]);

  return (
    <form className='todo-form' onSubmit={onSubmit}>
      <input
        className='todo-input'
        type='text'
        name='input'
        value={inputValue}
        placeholder='Enter here . . . '
        onChange={onChange}
        required
      />
      <button className='todo-button' type='submit'>
        {isEdit ? 'Edit Todo' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;
