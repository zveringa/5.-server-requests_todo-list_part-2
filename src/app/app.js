import React, { useEffect } from 'react';
import { ControlPanel, Todo } from '../components';
import { readTodos } from '../api';

import styles from './app.module.css';
import { useStateManager } from '../state-manager';

export const App = () => {
	const { state, setState } = useStateManager();
	const {
		todos,
		options: { searchPhrase, isAbcSorting },
	} = state;

	useEffect(() => {
		readTodos(searchPhrase, isAbcSorting).then((loadedTodos) => {
			setState({
				...state,
				todos: loadedTodos,
				options: {
					...state.options,
					isLoading: false,
				},
			});
		});
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
