import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../Todo.css';

const TaskDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [task, setTask] = useState(null);
	const [editTitle, setEditTitle] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchTask = useCallback(async () => {
		try {
			const response = await axios.get(`http://localhost:3001/todos/${id}`);
			if (response.data) {
				setTask(response.data);
				setEditTitle(response.data.title);
			} else {
				navigate('/404');
			}
		} catch (error) {
			console.error('Error fetching the task:', error);
			navigate('/404');
		} finally {
			setLoading(false);
		}
	}, [id, navigate]);

	useEffect(() => {
		fetchTask();
	}, [fetchTask]);

	const updateTask = async () => {
		try {
			await axios.put(`http://localhost:3001/todos/${id}`, { title: editTitle });
			setTask({ ...task, title: editTitle });
		} catch (error) {
			console.error('Error updating the task:', error);
		}
	};

	const deleteTask = async () => {
		try {
			await axios.delete(`http://localhost:3001/todos/${id}`);
			navigate('/');
		} catch (error) {
			console.error('Error deleting the task:', error);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (!task) return null; // In case of any unexpected error

	return (
		<div className="task-detail-container">
			<button onClick={() => navigate(-1)}>&larr; Back</button>
			<h2>Task Details</h2>
			<div>
				<input
					type="text"
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
				/>
				<button onClick={updateTask}>Update</button>
				<button onClick={deleteTask}>Delete</button>
			</div>
			<p>{task.title}</p>
		</div>
	);
};

export default TaskDetail;
