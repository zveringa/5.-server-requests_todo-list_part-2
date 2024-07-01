import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div>
			<h1>404 - Page Not Found</h1>
			<p>
				Go to <Link to="/">Home Page</Link>
			</p>
		</div>
	);
};

export default NotFoundPage;
