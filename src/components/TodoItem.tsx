import React, { useState } from 'react';
import styled from 'styled-components';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  background-color: #e3f2fd; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #bbdefb; 
    transform: translateY(-2px);
  }
`;

const Checkbox = styled.input`
  margin-right: 12px;
`;

const TodoText = styled.span<{ completed: boolean }>`
  flex-grow: 1;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ completed }) => (completed ? '#9e9e9e' : '#212121')}; 
  font-weight: ${({ completed }) => (completed ? 'normal' : 'bold')};
`;

const EditInput = styled.input`
  flex-grow: 1;
  margin-right: 12px;
  padding: 6px;
  border: 2px solid #64b5f6; 
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #42a5f5; 
    outline: none;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #c62828; 
    transform: scale(1.05);
  }
`;

const EditButton = styled.button`
  background-color: #4caf50; 
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #388e3c; 
    transform: scale(1.05);
  }
`;

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    updateTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <ListItem>
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {isEditing ? (
        <EditInput
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate} 
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate()} 
        />
      ) : (
        <TodoText completed={todo.completed}>{todo.text}</TodoText>
      )}
      <DeleteButton onClick={() => deleteTodo(todo.id)}>Delete</DeleteButton>
      <EditButton onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </EditButton>
    </ListItem>
  );
};

export default TodoItem;
