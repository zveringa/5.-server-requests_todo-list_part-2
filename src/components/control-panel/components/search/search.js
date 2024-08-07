import { useRef } from 'react';
import { useStateManager } from '../../../../state-manager';
import styles from './search.module.css';
import { debounce } from './utils';

export const Search = () => {
	const {
		state: {
			options: { searchInput, isAbcSorting },
		},
		updateState,
	} = useStateManager();

	const runSearch = (phrase, sorting) => {
		updateState({
			options: {
				searchInput: phrase,
				searchPhrase: phrase,
				isAbcSorting: sorting,
			},
		});
	};

	const debouncedRunSearch = useRef(debounce(runSearch, 1500)).current;

	const onChange = ({ target }) => {
		updateState({
			options: {
				searchInput: target.value,
			},
		});
		debouncedRunSearch(target.value, isAbcSorting);
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
