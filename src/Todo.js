import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		try {
			const response = await axios.get(
				'https://part-3-7993c-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
			);
			const todosData = response.data
				? Object.entries(response.data).map(([id, todo]) => ({ id, ...todo }))
				: [];
			setTodos(todosData);
		} catch (error) {
			console.error('Error fetching the todos:', error);
		}
	};

	const addTodo = async () => {
		if (!newTodo) return;
		try {
			const response = await axios.post(
				'https://part-3-7993c-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
				{ title: newTodo },
			);
			setTodos([...todos, { id: response.data.name, title: newTodo }]);
			setNewTodo('');
		} catch (error) {
			console.error('Error adding the todo:', error);
		}
	};

	const updateTodo = async (id, updatedTitle) => {
		try {
			await axios.patch(
				`https://part-3-7993c-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
				{ title: updatedTitle },
			);
			setTodos(
				todos.map((todo) =>
					todo.id === id ? { ...todo, title: updatedTitle } : todo,
				),
			);
		} catch (error) {
			console.error('Error updating the todo:', error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(
				`https://part-3-7993c-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
			);
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error('Error deleting the todo:', error);
		}
	};

	const filteredTodos = todos.filter(
		(todo) => todo.title && todo.title.includes(searchTerm),
	);

	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className="todo-container">
			<h1>Todo List</h1>
			<div className="controls">
				<input
					type="text"
					placeholder="New todo"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<button onClick={addTodo}>Add</button>
				<input
					type="text"
					placeholder="Search todos"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button onClick={() => setIsSorted(!isSorted)}>
					{isSorted ? 'Unsort' : 'Sort Alphabetically'}
				</button>
			</div>
			<ul className="todo-list">
				{sortedTodos.map((todo) => (
					<li key={todo.id} className="todo-item">
						<input
							type="text"
							value={todo.title}
							onChange={(e) => updateTodo(todo.id, e.target.value)}
						/>
						<button onClick={() => deleteTodo(todo.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Todo;
