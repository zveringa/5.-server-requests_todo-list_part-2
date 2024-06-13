import React from 'react';
import { useParams } from 'react-router-dom';

const DetailedTask = ({ todos }) => {
	const { id } = useParams();
	const todo = todos[id];

	return (
		<div className="detailed-task">
			<p>{todo}</p>
		</div>
	);
};

export { DetailedTask };
