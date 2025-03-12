const projects = [
    { name: "项目1", person: "张三", link: "project1.html" },
    { name: "项目2", person: "李四", link: "project2.html" },
    { name: "项目3", person: "王五", link: "project3.html" },
    { name: "项目4", person: "张三", link: "project4.html" },
    // 添加更多项目...
];

const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    results.innerHTML = '';
    if (query.length === 0) {
        results.style.display = 'none';
        return;
    }

    const filteredProjects = projects.filter(project => 
        project.name.toLowerCase().includes(query) || 
        project.person.toLowerCase().includes(query)
    );

    if (filteredProjects.length > 0) {
        filteredProjects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = `${project.name} - ${project.person}`;
            li.addEventListener('click', () => {
                window.location.href = project.link;
            });
            results.appendChild(li);
        });
        results.style.display = 'block';
    } else {
        results.style.display = 'none';
    }
});

document.addEventListener('click', function(event) {
    if (event.target !== searchInput) {
        results.style.display = 'none';
    }
});