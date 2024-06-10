import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyA_MaPKjr48hTUucabRG6C7PGu6dhyT9BE',
	authDomain: 'part-3-7993c.firebaseapp.com',
	projectId: 'part-3-7993c',
	storageBucket: 'part-3-7993c.appspot.com',
	messagingSenderId: '556385017306',
	appId: '1:556385017306:web:3455f3966e444f078034e3',
	databaseURL: 'https://part-3-7993c-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
