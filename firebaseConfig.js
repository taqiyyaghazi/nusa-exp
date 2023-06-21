import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDL6PAz8uADH5S5TvARhE3NnRXoFPXULmE',
    authDomain: 'nusa-exp.firebaseapp.com',
    projectId: 'nusa-exp',
    storageBucket: 'nusa-exp.appspot.com',
    messagingSenderId: '121135036800',
    appId: '1:121135036800:web:b8d111313cf95ed5172965',
    measurementId: 'G-29BMBQFSFB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage();
