import { db, addTask, getAllTasks, deleteTask } from './db.js';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const deadlineInput = document.getElementById('deadline-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const offlineBadge = document.getElementById('offline-badge');

// 1. Motivational Quote Feature
async function fetchQuote() {
    try {
        // Use DummyJSON API which is modern, supports CORS, and has a large database
        // Append unique timestamp to force a fresh fetch from the server every time
        const response = await fetch(`https://dummyjson.com/quotes/random?t=${Date.now()}`, {
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();

        const quote = {
            content: data.quote,
            author: data.author
        };

        // Save for offline consistency
        localStorage.setItem('currentQuote', JSON.stringify(quote));
        displayQuote(quote);
    } catch (error) {
        console.log('Error/Offline: Loading last saved quote');
        const saved = localStorage.getItem('currentQuote');
        if (saved) {
            displayQuote(JSON.parse(saved));
        } else {
            // Very first load fallback if never connected
            displayQuote({
                content: "Believe you can and you're halfway there.",
                author: "Theodore Roosevelt"
            });
        }
    }
}

function displayQuote(data) {
    if (!data) return;
    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
}

// 2. Task Management Feature
async function renderTasks() {
    const tasks = await getAllTasks();
    taskCount.textContent = `${tasks.length} tasks`;
    taskList.innerHTML = '';

    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    tasks.forEach(task => {
        const div = document.createElement('div');
        const deadlineClass = getDeadlineClass(task.deadline);
        div.className = `task-item ${deadlineClass}`;

        div.innerHTML = `
      <div class="task-info">
        <h3>${task.description}</h3>
        <p>Due: ${new Date(task.deadline).toLocaleDateString()}</p>
      </div>
      <button class="btn-delete" data-id="${task.id}">
        Delete
      </button>
    `;
        taskList.appendChild(div);
    });
}

function getDeadlineClass(deadlineDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineDate);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'deadline-passed';
    if (diffDays <= 3) return 'deadline-urgent';
    if (diffDays <= 7) return 'deadline-approaching';
    return 'deadline-far';
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const desc = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (desc && deadline) {
        await addTask(desc, deadline);
        taskInput.value = '';
        deadlineInput.value = '';
        renderTasks();
    }
});

taskList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const id = parseInt(e.target.dataset.id);
        await deleteTask(id);
        renderTasks();
    }
});

// 3. Offline Capabilities
function updateOnlineStatus() {
    if (navigator.onLine) {
        offlineBadge.classList.remove('is-offline');
    } else {
        offlineBadge.classList.add('is-offline');
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchQuote();
    renderTasks();
    updateOnlineStatus();

    // Deadline input restriction removed to allow previous dates
});
