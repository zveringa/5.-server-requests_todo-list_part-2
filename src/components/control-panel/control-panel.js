import { Button } from '../button/button';
import { Search, Sorting } from './components';
import styles from './control-panel.module.css';

export const ControlPanel = ({ onTodoAdd, onSorting, onSearch }) => {
	return (
		<div className={styles.controlPanel}>
			<Search onSearch={onSearch} />
			<Sorting onSorting={onSorting} />
			<Button className={styles.addButton} onClick={onTodoAdd}>
				✚
			</Button>
		</div>
	);
};
