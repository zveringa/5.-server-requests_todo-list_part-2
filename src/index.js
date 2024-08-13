import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './app';

import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container); // Create the root container

root.render(
	<Provider store={store}>
		<App />
	</Provider>,
);
