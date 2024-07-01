import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Todo.css';

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
			const response = await axios.get('http://localhost:3001/todos');
			setTodos(response.data);
		} catch (error) {
			console.error('Error fetching the todos:', error);
		}
	};

	const addTodo = async () => {
		if (!newTodo) return;
		try {
			const response = await axios.post('http://localhost:3001/todos', {
				title: newTodo,
			});
			setTodos([...todos, response.data]);
			setNewTodo('');
		} catch (error) {
			console.error('Error adding the todo:', error);
		}
	};

	const filteredTodos = todos.filter((todo) => todo.title.includes(searchTerm));

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
						<Link to={`/task/${todo.id}`} className="todo-link">
							{todo.title.length > 50
								? `${todo.title.slice(0, 50)}...`
								: todo.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Todo;
