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
    const googleBtn = document.getElementById('google-login-button');
    const emailBtn = document.getElementById('email-login-button');
    const registerBtn = document.getElementById('register-button');
    const logoutBtn = document.getElementById('logout-button');
    const closeBtn = document.getElementById('close-login-btn'); // 👈 添加关闭按钮

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // 默认显示登录框，等状态判断
    mask.style.display = 'flex';
    logoutBtn.style.display = 'none';

    // 关闭按钮事件 👇
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mask.style.display = 'none';
        });
    }

    // 登录状态变化监听
    onAuthStateChanged(auth, user => {
        if (user) {
            mask.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            mask.style.display = 'flex';
            logoutBtn.style.display = 'none';
        }
    });

    // Google 登录
    googleBtn?.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then(result => {
                alert(`欢迎 ${result.user.displayName || result.user.email}！`);
                mask.style.display = 'none';
                logoutBtn.style.display = 'block';
            })
            .catch(err => {
                console.error('登录失败:', err);
                alert('登录失败，请查看控制台。');
            });
    });

    // 邮箱登录（你已实现）
    emailBtn?.addEventListener('click', async () => {
        const email = prompt("请输入邮箱：");
        const password = prompt("请输入密码：");
        if (email && password) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                alert(`欢迎 ${userCredential.user.email}`);
                mask.style.display = 'none';
                logoutBtn.style.display = 'block';
            } catch (err) {
                console.error('邮箱登录失败:', err);
                alert("邮箱登录失败，请检查邮箱/密码或网络连接。");
            }
        }
    });

    // 注册按钮
    registerBtn?.addEventListener('click', async () => {
        const email = prompt("注册邮箱：");
        const password = prompt("设置密码（最少6位）：");
        if (email && password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                alert(`注册成功：${userCredential.user.email}`);
                mask.style.display = 'none';
                logoutBtn.style.display = 'block';
            } catch (err) {
                console.error('注册失败:', err);
                alert("注册失败，请检查输入或控制台错误。");
            }
        }
    });

    // 登出按钮
    logoutBtn?.addEventListener('click', () => {
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
