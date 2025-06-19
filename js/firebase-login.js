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

function setupLogin() {
    const mask = document.getElementById('login-mask');
    const googleBtn = document.getElementById('google-login-button');
    const emailBtn = document.getElementById('email-login-button');
    const registerBtn = document.getElementById('register-button');
    const logoutBtn = document.getElementById('logout-button');
    const closeBtn = document.getElementById('close-login-btn');

    console.log('元素检测：');
    console.log('mask:', mask);
    console.log('googleBtn:', googleBtn);
    console.log('emailBtn:', emailBtn);
    console.log('registerBtn:', registerBtn);
    console.log('logoutBtn:', logoutBtn);
    console.log('closeBtn:', closeBtn);

    if (!mask || !googleBtn || !emailBtn || !registerBtn || !logoutBtn || !closeBtn) {
        console.warn('有元素未找到，请检查 HTML 中对应元素的 ID');
    }

    // 默认显示登录遮罩，隐藏登出按钮
    mask.style.display = 'flex';
    logoutBtn.style.display = 'none';

    // 关闭登录遮罩
    closeBtn.addEventListener('click', () => {
        console.log('关闭按钮被点击');
        mask.style.display = 'none';
    });

    // 监听登录状态
    onAuthStateChanged(auth, user => {
        console.log('Auth 状态变化，当前用户：', user);
        if (user) {
            mask.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            mask.style.display = 'flex';
            logoutBtn.style.display = 'none';
        }
    });

    // Google 登录
    googleBtn.addEventListener('click', () => {
        console.log('点击 Google 登录按钮');
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log('Google 登录成功，用户信息:', result.user);
                alert(`欢迎 ${result.user.displayName || result.user.email}！`);
                mask.style.display = 'none';
                logoutBtn.style.display = 'block';
            })
            .catch(err => {
                console.error('Google 登录失败:', err);
                alert('登录失败，请查看控制台');
            });
    });

    // 邮箱登录
    emailBtn.addEventListener('click', async () => {
        console.log('点击邮箱登录按钮');
        const email = prompt("请输入邮箱：");
        const password = prompt("请输入密码：");
        if (!email || !password) {
            alert('邮箱和密码不能为空');
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('邮箱登录成功:', userCredential.user);
            alert(`欢迎 ${userCredential.user.email}`);
            mask.style.display = 'none';
            logoutBtn.style.display = 'block';
        } catch (err) {
            console.error('邮箱登录失败:', err);
            alert('邮箱登录失败，请检查邮箱/密码或网络');
        }
    });

    // 注册
    registerBtn.addEventListener('click', async () => {
        console.log('点击注册按钮');
        const email = prompt("注册邮箱：");
        const password = prompt("设置密码（至少6位）：");
        if (!email || !password) {
            alert('邮箱和密码不能为空');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('注册成功:', userCredential.user);
            alert(`注册成功：${userCredential.user.email}`);
            mask.style.display = 'none';
            logoutBtn.style.display = 'block';
        } catch (err) {
            console.error('注册失败:', err);
            alert('注册失败，请检查输入或查看控制台');
        }
    });

    // 登出
    logoutBtn.addEventListener('click', () => {
        console.log('点击登出按钮');
        signOut(auth)
            .then(() => {
                console.log('登出成功');
                alert('已登出');
                mask.style.display = 'flex';
                logoutBtn.style.display = 'none';
            })
            .catch(err => {
                console.error('登出失败:', err);
                alert('登出失败，请查看控制台');
            });
    });
}

// 等待页面加载完毕后调用
window.addEventListener('DOMContentLoaded', () => {
    console.log('页面 DOMContentLoaded，开始初始化登录模块');
    setupLogin();
});
