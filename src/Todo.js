import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Todo.css';
import { DetailedTask } from './components/DetailedTask';

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
			const response = await axios.get('http://localhost:5000/todos');
			setTodos(response.data);
		} catch (error) {
			console.error('Error fetching the todos:', error);
		}
	};

	const addTodo = async () => {
		if (!newTodo) return;
		try {
			const response = await axios.post('http://localhost:5000/todos', {
				title: newTodo,
			});
			setTodos([...todos, response.data]);
			setNewTodo('');
		} catch (error) {
			console.error('Error adding the todo:', error);
		}
	};

	const updateTodo = async (id, updatedTitle) => {
		try {
			await axios.put(`http://localhost:5000/todos/${id}`, { title: updatedTitle });
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
			await axios.delete(`http://localhost:5000/todos/${id}`);
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error('Error deleting the todo:', error);
		}
	};

	const filteredTodos = todos.filter((todo) => todo.title.includes(searchTerm));

	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className="todo-container">
			<div>
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
							<Link
								to={`/todos/${todo.id}`}
								className="task-field"
								type="url"
								value={todo.title}
								onChange={(e) => updateTodo(todo.id, e.target.value)}
							>
								{todo.title}
							</Link>

							<button onClick={() => deleteTodo(todo.id)}>Delete</button>
						</li>
					))}
				</ul>
			</div>

			<Routes>
				{todos.map((todo) => (
					<Route
						key={todo.id}
						path={`/todos/${todo.id}`}
						element={<DetailedTask todo={todo} />}
					/>
				))}
			</Routes>
		</div>
	);
};

export default Todo;
