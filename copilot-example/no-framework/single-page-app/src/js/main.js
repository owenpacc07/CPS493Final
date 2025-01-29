// JavaScript logic for handling form submissions and managing the task list functionality

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Handle sign-up form submission
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        // Here you can add logic to handle the sign-up, e.g., sending data to a server
        console.log(`Name: ${name}, Username: ${username}, Email: ${email}`);
        signupForm.reset();
    });

    // Handle task addition
    document.getElementById('add-task').addEventListener('click', () => {
        const taskText = taskInput.value;
        if (taskText) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
            taskList.appendChild(listItem);
            taskInput.value = '';
        }
    });
});