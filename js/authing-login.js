import { Authing } from 'https://cdn.jsdelivr.net/npm/@authing/browser@5.5.1/dist/authing.browser.esm.min.js';

// 创建 Authing 客户端实例
const authingClient = new Authing({
    appId: '6853b4e9a0c91359e5e468ee', // 使用你的 Authing 应用 ID
    domain: 'phtbdhowjypm-demo.authing.cn',
    redirectUri: window.location.origin
});

export function setupLogin() {
    const mask = document.getElementById('login-mask');
    const loginBtn = document.getElementById('login-button');
    const logoutBtn = document.getElementById('logout-button');

    // 设置初始显示状态
    mask.style.display = 'flex';
    logoutBtn.style.display = 'none';

    // 检查用户是否已登录
    authingClient.checkLoginStatus()
        .then(async (isLoggedIn) => {
            if (isLoggedIn) {
                const userInfo = await authingClient.getUserInfo();
                mask.style.display = 'none'; // 隐藏登录界面
                logoutBtn.style.display = 'block'; // 显示登出按钮
                console.log("欢迎回来", userInfo);
            } else {
                mask.style.display = 'flex'; // 显示登录界面
            }
        });

    // 登录按钮事件
    loginBtn?.addEventListener('click', () => {
        authingClient.loginWithRedirect(); // 使用 Authing 登录
    });

    // 登出按钮事件
    logoutBtn?.addEventListener('click', () => {
        authingClient.logoutWithRedirect(); // 使用 Authing 登出
    });
}
