import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todo from './components/Todo';
import TaskDetailed from './pages/TaskDetailed';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Todo />} />
				<Route path="/task/:id" element={<TaskDetailed />} />
				<Route path="/404" element={<NotFoundPage />} />
				{/* <Route path="*" element={<NotFoundPage />} /> */}
			</Routes>
		</Router>
	);
};

export default App;
