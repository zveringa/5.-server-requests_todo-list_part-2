import React, { useEffect } from 'react';
import { ControlPanel, Todo } from '../components';

import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import { selectTodos, selectSearcPhrase, selectIsAbcSorting } from '../selectors';
import { readTodosAsynch } from '../actions';

export const App = () => {
	const todos = useSelector(selectTodos);
	const searchPhrase = useSelector(selectSearcPhrase);
	const isAbcSorting = useSelector(selectIsAbcSorting);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(readTodosAsynch(searchPhrase, isAbcSorting));
	}, [searchPhrase, isAbcSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel />
			<div>
				{todos.map(({ id, title, completed }) => (
					<Todo key={id} id={id} title={title} completed={completed} />
				))}
			</div>
		</div>
	);
};
