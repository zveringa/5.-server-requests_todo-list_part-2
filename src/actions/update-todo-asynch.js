import { updateTodo } from '../api';
import { ACTION_TYPE } from './action-type';

export const updateTodoAsynch = (newTodoData) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });

	return updateTodo(newTodoData)
		.then(() => {
			dispatch({ type: ACTION_TYPE.UPDATE_TODO, payload: newTodoData });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
