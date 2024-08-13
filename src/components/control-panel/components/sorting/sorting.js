import styles from './sorting.module.css';
import { Button } from '../../../button/button';
import { ACTION_TYPE } from '../../../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAbcSorting } from '../../../../selectors';

export const Sorting = () => {
	const isAbcSorting = useSelector(selectIsAbcSorting);
	const dispatch = useDispatch();

	const onChange = ({ target }) => {
		dispatch({ type: ACTION_TYPE.SET_IS_ABC_SORTING, payload: target.checked });
	};
	return (
		<Button>
			<input
				className={styles.checkbox}
				id="sorting-button"
				type="checkbox"
				checked={isAbcSorting}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor="sorting-button">
				A&darr;
			</label>
		</Button>
	);
};
