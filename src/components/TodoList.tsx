import React, { useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background-color: #ffffff; 
`;

const Title = styled.h1`
  text-align: center;
  color: #1e88e5; 
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%; 
  padding: 12px;
  border: 2px solid #81d4fa; 
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e88e5; 
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ff4081; 
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #f50057; 
    transform: scale(1.05);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0; 
`;

const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodo([...todo, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodo(
      todo.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodo(todo.filter(item => item.id !== id));
  };

  const updateTodo = (id: number, text: string) => {
    setTodo(
      todo.map(item => 
        item.id === id ? { ...item, text } : item
      )
    );
  };

  return (
    <Container>
      <Title>Todo List</Title>
      <Input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && addTodo()}
        placeholder="Add a new task"
      />
      <Button onClick={addTodo}>Add</Button>
      <List>
        {todo.map(item => (
          <TodoItem
            key={item.id}
            todo={item}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
