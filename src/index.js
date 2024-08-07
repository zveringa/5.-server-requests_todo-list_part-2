import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App, initialState } from './app';
import { StateManager } from './state-manager';

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container); // Create the root container

root.render(
	<StateManager initialState={initialState}>
		<App />
	</StateManager>,
);
