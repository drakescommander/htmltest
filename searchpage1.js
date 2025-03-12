// script.js
const projects = [
    {
        id: "P001",
        name: "智慧城市建设项目",
        address: "北京市朝阳区",
        firstContact: "2023-03-15",
        area: "5亿",
        urgency: "高",
        investor: "国家开发投资公司",
        designer: "中国建筑设计研究院",
        mechanical: "中建三局",
        consultant: "麦肯锡咨询",
        contacts: [
            { name: "张三", phone: "13800138000", position: "项目经理", address: "北京市朝阳区XX大厦" },
            { name: "李四", phone: "13900139000", position: "技术总监", address: "上海市浦东新区XX中心" }
        ],
        brandScope: "智慧交通、物联网设备",
        evaluation: "国家级重点示范项目，政府支持力度大",
        drawingProgress: "已完成初步设计图纸",
        records: [
            { date: "2023-04-01", method: "会议", person: "王五", progress: "确定初步方案" },
            { date: "2023-05-10", method: "电话", person: "赵六", progress: "确认设备清单" }
        ]
    },
    {
        id: "P002",
        name: "只会",
        address: "上海浦东朝阳区",
        firstContact: "2023-04-15",
    },
    // 更多项目数据...
];

// DOM元素
const searchInterface = document.getElementById('searchInterface');
const projectInterface = document.getElementById('projectInterface');
const backButton = document.getElementById('backButton');

// 搜索功能实现
document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const results = document.getElementById('searchResults');
    results.innerHTML = '';

    if (query.length > 0) {
        const matches = projects.filter(project => 
            project.name.toLowerCase().includes(query) ||
            project.contacts.some(contact => 
                contact.name.toLowerCase().includes(query)
            )
        );

        matches.forEach(project => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${project.name}</strong>
                <span>负责人：${project.contacts[0].name}</span>
                <span class="project-id">${project.id}</span>
            `;
            li.addEventListener('click', () => showProject(project));
            results.appendChild(li);
        });
    }
});

// 显示项目详情
function showProject(project) {
    searchInterface.classList.add('hidden');
    projectInterface.classList.remove('hidden');

    // 填充基本信息
    document.getElementById('projectNumber').value = project.id;
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectAddress').value = project.address;
    document.getElementById('projectfirstContact').value = project.firstContact;
    
    // 填充联系人
    project.contacts.forEach((contact, index) => {
        const num = index + 1;
        document.getElementById(`contactName${num}`).value = contact.name;
        document.getElementById(`contactPhone${num}`).value = contact.phone;
        document.getElementById(`contactPosition${num}`).value = contact.position;
        document.getElementById(`contactAddress${num}`).value = contact.address;
    });

    // 填充跟进记录
    project.records.forEach((record, index) => {
        const num = index + 1;
        document.getElementById(`followUpDate${num}`).value = record.date;
        document.getElementById(`followUpMethod${num}`).value = record.method;
        document.getElementById(`contactPerson${num}`).value = record.person;
        document.getElementById(`followUpProgress${num}`).value = record.progress;
    });

    // 其他字段填充...
}

// 返回按钮功能
backButton.addEventListener('click', () => {
    projectInterface.classList.add('hidden');
    searchInterface.classList.remove('hidden');
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
});

// 初始隐藏项目界面
projectInterface.classList.add('hidden');