import { HTTP_METHOD } from '../constants';

const fetchServer = (method, { id, ...payload } = {}) => {
	let url = `http://localhost:3001/todos`;
	let options = {
		method,
		headers: { 'Content-Type': 'application/json' },
	};

	if (method === HTTP_METHOD.GET) {
		const { searchPhrase, isAbcSorting } = payload;

		const sortingParams = isAbcSorting
			? '_sort=title&_order=asc'
			: '_sort=id&_order=desc';
		url += `?${sortingParams}&title_like=${searchPhrase}`;
	} else {
		if (method !== HTTP_METHOD.POST) {
			url += `/${id}`;
		}

		if (method !== HTTP_METHOD.DELETE) {
			options.body = JSON.stringify(payload);
		}
	}

	return fetch(url, options).then((jsonData) => jsonData.json());
};

export const createTodo = (newTodo) => fetchServer('POST', newTodo);

export const readTodos = (searchPhrase = '', isAbcSorting = false) =>
	fetchServer('GET', { searchPhrase, isAbcSorting });

export const updateTodo = (todoData) => fetchServer('PATCH', todoData);

export const deleteTodo = (todoId) => fetchServer('DELETE', { id: todoId });
