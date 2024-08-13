import { useRef } from 'react';
import { selectSearchInput } from '../../../../selectors';
import styles from './search.module.css';
import { debounce } from './utils';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TYPE } from '../../../../actions';

export const Search = () => {
	const searchInput = useSelector(selectSearchInput);
	const dispatch = useDispatch();

	const runSearch = (phrase) => {
		dispatch({ type: ACTION_TYPE.SET_SEARCH_PHRASE, payload: phrase });
	};

	const debouncedRunSearch = useRef(debounce(runSearch, 1500)).current;

	const onChange = ({ target }) => {
		dispatch({ type: ACTION_TYPE.SET_SEARCH_INPUT, payload: target.value });

		debouncedRunSearch(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		runSearch(searchInput);
	};
	return (
		<form className={styles.search} onSubmit={onSubmit}>
			<input
				className={styles.input}
				type="text"
				value={searchInput}
				placeholder="Search..."
				onChange={onChange}
			/>
		</form>
	);
};
