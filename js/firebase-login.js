import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyD4NOKwIY2lXJP_neRJkmaJdRHxqMFSeog",
    authDomain: "moh-home.firebaseapp.com",
    projectId: "moh-home",
    storageBucket: "moh-home.appspot.com",
    messagingSenderId: "115274042812",
    appId: "1:115274042812:web:daa0d359759801bddb2fb9",
    measurementId: "G-VX7GB2X23K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function setupLogin() {
    onAuthStateChanged(auth, user => {
        console.log('Auth state changed, user:', user);
        if (user) {
            mask.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            mask.style.display = 'flex';
            logoutBtn.style.display = 'none';
        }
    });
    console.log('setupLogin called')
    const mask = document.getElementById('login-mask');
    const loginBtn = document.getElementById('login-button');
    const logoutBtn = document.getElementById('logout-button');

    // 页面刚加载，默认显示登录界面，等检测登录状态后决定是否隐藏
    mask.style.display = 'flex';
    logoutBtn.style.display = 'none';

    // 监听登录状态变化
    onAuthStateChanged(auth, user => {
        if (user) {
            // 用户已登录，隐藏登录界面，显示登出按钮
            mask.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            // 用户未登录，保持登录界面显示，隐藏登出按钮
            mask.style.display = 'flex';
            logoutBtn.style.display = 'none';
        }
    });

    // 登录按钮事件
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            signInWithPopup(auth, provider)
                .then(result => {
                    const user = result.user;
                    alert(`欢迎 ${user.displayName || user.email}！`);
                    mask.style.display = 'none';
                    logoutBtn.style.display = 'block';
                })
                .catch(err => {
                    console.error('登录失败:', err);
                    alert('登录失败，请查看控制台。');
                });
        });
    }

    // 登出按钮事件
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth)
                .then(() => {
                    alert('已登出');
                    mask.style.display = 'flex';
                    logoutBtn.style.display = 'none';
                })
                .catch(err => {
                    console.error('登出失败:', err);
                });
        });
    }
}
window.auth = auth;
