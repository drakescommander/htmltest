// project.js
document.addEventListener('DOMContentLoaded', () => {
    // 定义选择器和状态变量
    const EDITABLE_SELECTOR = '.editable-content';
    let isEditing = false;

    // 创建操作按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'action-buttons';
    buttonContainer.innerHTML = `
        <button class="edit-btn">修改</button>
        <button class="save-btn" disabled>保存</button>
    `;
    document.querySelector('.container').prepend(buttonContainer);

    // 获取按钮元素
    const editBtn = document.querySelector('.edit-btn');
    const saveBtn = document.querySelector('.save-btn');

    // 事件监听
    editBtn.addEventListener('click', toggleEditMode);
    saveBtn.addEventListener('click', saveChanges);

    // 初始化加载保存数据
    loadSavedData();

    function toggleEditMode() {
        isEditing = !isEditing;
        const editables = document.querySelectorAll(EDITABLE_SELECTOR);
        
        editables.forEach(el => {
            el.contentEditable = isEditing;
            el.classList.toggle('editing-mode', isEditing);
        });

        // 更新按钮状态
        editBtn.textContent = isEditing ? '取消编辑' : '修改';
        saveBtn.disabled = !isEditing;
    }

    function saveChanges() {
        const changes = {};
        const elements = document.querySelectorAll(EDITABLE_SELECTOR);
        
        elements.forEach((el, index) => {
            changes[`editable-${index}`] = el.textContent.trim();
        });

        localStorage.setItem('projectEdits', JSON.stringify(changes));
        alert('修改内容已保存！');
        toggleEditMode();
    }

    function loadSavedData() {
        const savedData = localStorage.getItem('projectEdits');
        if (savedData) {
            const changes = JSON.parse(savedData);
            const elements = document.querySelectorAll(EDITABLE_SELECTOR);
            
            elements.forEach((el, index) => {
                const key = `editable-${index}`;
                if (changes[key]) {
                    el.textContent = changes[key];
                }
            });
        }
    }
});