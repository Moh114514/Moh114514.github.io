import { Authing } from 'https://cdn.jsdelivr.net/npm/@authing/browser@5.5.1/dist/authing.browser.esm.min.js';

const authingClient = new Authing({
    appId: '6853b4e9a0c91359e5e468ee', // ✅ 请替换成你的 Authing 应用 ID
    domain: 'phtbdhowjypm-demo.authing.cn',
    redirectUri: window.location.origin
});

export function setupLogin() {
    const mask = document.getElementById('login-mask');
    const loginBtn = document.getElementById('login-button');
    const logoutBtn = document.getElementById('logout-button');

    mask.style.display = 'flex';
    logoutBtn.style.display = 'none';

    // 检查是否已登录
    authingClient.checkLoginStatus()
        .then(async (isLoggedIn) => {
            if (isLoggedIn) {
                const userInfo = await authingClient.getUserInfo();
                mask.style.display = 'none';
                logoutBtn.style.display = 'block';
                console.log("欢迎回来", userInfo);
            } else {
                mask.style.display = 'flex';
            }
        });

    // 登录按钮事件
    loginBtn?.addEventListener('click', () => {
        authingClient.loginWithRedirect();
    });

    // 登出按钮事件
    logoutBtn?.addEventListener('click', () => {
        authingClient.logoutWithRedirect();
    });
}
