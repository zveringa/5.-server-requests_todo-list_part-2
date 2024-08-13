import { ACTION_TYPE } from '../actions';

const optionsInitialState = {
	searchInput: '',
	searchPhrase: '',
	isAbcSorting: false,
	isLoading: true,
};

export const optionsReducer = (state = optionsInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOADING_START:
			return {
				...state,
				isLoading: true,
			};
		case ACTION_TYPE.LOADING_END:
			return {
				...state,
				isLoading: false,
			};

		case ACTION_TYPE.SET_SEARCH_PHRASE:
			return {
				...state,
				searchPhrase: payload,
			};
		case ACTION_TYPE.SET_SEARCH_INPUT:
			return {
				...state,
				searchInput: payload,
			};
		case ACTION_TYPE.SET_IS_ABC_SORTING:
			return {
				...state,
				isAbcSorting: payload,
			};

		default:
			return state;
	}
};
