document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const taskEditor = document.getElementById('task-editor');
    const saveTasksButton = document.getElementById('save-tasks');
    const toggleThemeButton = document.getElementById('toggle-theme');

    let tasks = loadTasks();
    let currentTheme = loadTheme();

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : defaultTasks();
    }

    function loadTheme() {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme : 'dark';
    }

    function defaultTasks() {
        return [
            { time: '09:00', description: 'Morning Meeting', completed: false },
            { time: '11:00', description: 'Code Review', completed: false },
            { time: '14:00', description: 'Development', completed: false },
            { time: '16:00', description: 'Project Planning', completed: false }
        ];
    }

    function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = `${task.time} - ${task.description}`;
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                tasks[index].completed = checkbox.checked;
                saveTasks();
                updateProgressBar();
            });
            taskItem.prepend(checkbox);
            taskList.appendChild(taskItem);
        });
    }

    function updateProgressBar() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const progress = (completedTasks / tasks.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.className = currentTheme;
        localStorage.setItem('theme', currentTheme);
    }

    function updateTime() {
        const now = new Date();
        currentTimeDisplay.textContent = now.toLocaleTimeString();
    }

    toggleThemeButton.addEventListener('click', toggleTheme);
    saveTasksButton.addEventListener('click', () => {
        const editedTasks = taskEditor.value.split('\n').map(task => {
            const [time, description] = task.split(' - ');
            return { time, description, completed: false };
        });
        tasks = editedTasks;
        saveTasks();
        updateTaskList();
    });

    setInterval(updateTime, 1000);
    updateTaskList();
    updateProgressBar();
    toggleTheme();
});
