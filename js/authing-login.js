// 不再使用 import，使用全局变量 Authing
export function setupLogin() {
    const mask = document.getElementById('login-mask');
    const loginBtn = document.getElementById('login-button');
    const logoutBtn = document.getElementById('logout-button');

    mask.style.display = 'flex';
    logoutBtn.style.display = 'none';

    const authingClient = new window.Authing({
        appId: '6853b4e9a0c91359e5e468ee',
        domain: 'phtbdhowjypm-demo.authing.cn',
        redirectUri: window.location.origin
    });

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

    loginBtn?.addEventListener('click', () => {
        authingClient.loginWithRedirect();
    });

    logoutBtn?.addEventListener('click', () => {
        authingClient.logoutWithRedirect();
    });
}
