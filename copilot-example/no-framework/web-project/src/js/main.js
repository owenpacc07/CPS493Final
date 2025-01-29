// JavaScript code for the task list feature and sign-up form validation

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
    
    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
            taskList.appendChild(listItem);
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    });

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value.trim();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            if (!name || !username || !email) {
                event.preventDefault();
                alert('All fields are required.');
            }
        });
    }
});