import { useState } from 'react';
import styles from './sorting.module.css';
import { Button } from '../../../button/button';

export const Sorting = ({ onSorting, isSortingEnabled }) => {
	const [isEnabled, setIsEnabled] = useState(false);

	const onChange = ({ target }) => {
		setIsEnabled(target.checked);
		onSorting(target.checked);
	};
	return (
		<Button>
			<input
				className={styles.checkbox}
				id="sorting-button"
				type="checkbox"
				checked={isSortingEnabled}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor="sorting-button">
				A&darr;
			</label>
		</Button>
	);
};
