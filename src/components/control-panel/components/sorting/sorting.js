import styles from './sorting.module.css';
import { Button } from '../../../button/button';
import { useStateManager } from '../../../../state-manager';

export const Sorting = () => {
	const {
		state: {
			options: { isAbcSorting },
		},
		updateState,
	} = useStateManager();

	const onChange = ({ target }) => {
		updateState({
			options: {
				isAbcSorting: target.checked,
			},
		});
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
