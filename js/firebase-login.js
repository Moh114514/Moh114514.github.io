import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

// 你的 Firebase 配置
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
const googleProvider = new GoogleAuthProvider();

export function setupLogin() {
    const mask = document.getElementById('login-mask');
    const googleLoginBtn = document.getElementById('google-login-button');
    const emailLoginBtn = document.getElementById('email-login-button');
    const registerBtn = document.getElementById('register-button');
    const logoutBtn = document.getElementById('logout-button');

    // 默认显示登录界面，隐藏登出按钮
    mask.style.display = 'flex';
    logoutBtn.style.display = 'none';

    // 监听登录状态变化
    onAuthStateChanged(auth, user => {
        if (user) {
            mask.style.display = 'none';
            logoutBtn.style.display = 'block';
            console.log("当前用户:", user.email || user.displayName);
        } else {
            mask.style.display = 'flex';
            logoutBtn.style.display = 'none';
        }
    });

    // Google 登录
    googleLoginBtn?.addEventListener('click', () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                alert(`欢迎 ${result.user.displayName || result.user.email}！`);
                mask.style.display = 'none';
                logoutBtn.style.display = 'block';
            })
            .catch(error => {
                console.error('Google 登录失败:', error);
                alert('Google 登录失败，请查看控制台');
            });
    });

    // 邮箱登录
    emailLoginBtn?.addEventListener('click', () => {
        const email = prompt('请输入邮箱');
        const password = prompt('请输入密码');
        if (!email || !password) {
            alert('邮箱和密码不能为空');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                alert(`欢迎回来，${result.user.email}！`);
                mask.style.display = 'none';
                logoutBtn.style.display = 'block';
            })
            .catch(error => {
                console.error('邮箱登录失败:', error);
                alert('邮箱登录失败，请查看控制台');
            });
    });

    // 邮箱注册
    registerBtn?.addEventListener('click', () => {
        const email = prompt('请输入注册邮箱');
        const password = prompt('请输入密码（至少6位）');
        if (!email || !password) {
            alert('邮箱和密码不能为空');
            return;
        }
        if (password.length < 6) {
            alert('密码至少6位');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                alert(`注册成功，欢迎 ${result.user.email}！`);
                mask.style.display = 'none';
                logoutBtn.style.display = 'block';
            })
            .catch(error => {
                console.error('注册失败:', error);
                alert('注册失败，请查看控制台');
            });
    });

    // 登出
    logoutBtn?.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                alert('已登出');
                mask.style.display = 'flex';
                logoutBtn.style.display = 'none';
            })
            .catch(error => {
                console.error('登出失败:', error);
                alert('登出失败，请查看控制台');
            });
    });
}
