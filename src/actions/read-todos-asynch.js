import { readTodos } from '../api';
import { ACTION_TYPE } from './action-type';

export const readTodosAsynch = (searchPhrase, isAbcSorting) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });

	return readTodos(searchPhrase, isAbcSorting)
		.then((loadedTodos) => {
			dispatch({ type: ACTION_TYPE.SET_TODOS, payload: loadedTodos });
			dispatch({ type: ACTION_TYPE.LOADING_START });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
