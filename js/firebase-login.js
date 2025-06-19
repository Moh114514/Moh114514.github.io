// source/js/firebase-login.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyD4NOKwIY2lXJP_neRJkmaJdRHxqMFSeog",
    authDomain: "moh-home.firebaseapp.com",
    projectId: "moh-home",
    storageBucket: "moh-home.firebasestorage.app",
    messagingSenderId: "115274042812",
    appId: "1:115274042812:web:daa0d359759801bddb2fb9",
    measurementId: "G-VX7GB2X23K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-button');
    const logoutBtn = document.getElementById('logout-button');
    const loginBox = document.getElementById('login-box');
    const loginMask = document.getElementById('login-mask');

    if (!loginBtn || !logoutBtn) {
        console.warn('找不到登录或登出按钮');
        return;
    }

    loginBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                alert(`欢迎，${user.displayName || user.email}`);
                loginBtn.style.display = 'none';
                logoutBtn.style.display = 'inline-block';
                loginMask.style.display = 'none';
            })
            .catch(error => {
                console.error('登录失败', error);
                alert('登录失败，请检查控制台。');
            });
    });

    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert('你已登出');
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        });
    });
});
