document.addEventListener('DOMContentLoaded', function() {
    // 友链筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const friendCards = document.querySelectorAll('.friend-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 获取筛选类别
            const category = this.dataset.category;

            // 筛选友链
            friendCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 友链申请表单处理
    const form = document.getElementById('friend-request-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: this.name.value,
                url: this.url.value,
                avatar: this.avatar.value,
                desc: this.desc.value
            };

            // 这里可以添加表单提交逻辑
            // 例如发送到服务器或显示成功消息
            alert(`友链申请已提交！\n名称: ${formData.name}\n网址: ${formData.url}`);
            form.reset();
        });
    }
});