// Task Class
class Task {
    constructor(id, text, status, createdAt, completedAt = null) {
        this.id = id;
        this.text = text;
        this.status = status; // 'pending' or 'completed'
        this.createdAt = createdAt;
        this.completedAt = completedAt;
    }
}

// To-Do App Class
class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentEditId = null;
        this.init();
    }

    // Load tasks from localStorage
    loadTasks() {
        const saved = localStorage.getItem('todoTasks');
        if (saved) {
            const tasks = JSON.parse(saved);
            return tasks.map(task => new Task(
                task.id, task.text, task.status, task.createdAt, task.completedAt
            ));
        }
        return [];
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-PK', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    // Add new task
    addTask(text) {
        if (!text.trim()) {
            this.showToast('Please enter a task!', 'warning');
            return false;
        }

        const task = new Task(
            Date.now(),
            text.trim(),
            'pending',
            new Date().toISOString()
        );
        this.tasks.push(task);
        this.saveTasks();
        this.render();
        this.showToast('Task added successfully!', 'success');
        return true;
    }

    // Delete task
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.render();
        this.showToast('Task deleted!', 'info');
    }

    // Toggle task status (pending <-> completed)
    toggleTaskStatus(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            if (task.status === 'pending') {
                task.status = 'completed';
                task.completedAt = new Date().toISOString();
            } else {
                task.status = 'pending';
                task.completedAt = null;
            }
            this.saveTasks();
            this.render();
            this.showToast(
                task.status === 'completed' ? 'Task completed! 🎉' : 'Task moved back to pending',
                'info'
            );
        }
    }

    // Edit task
    editTask(id, newText) {
        if (!newText.trim()) {
            this.showToast('Task cannot be empty!', 'warning');
            return false;
        }
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = newText.trim();
            this.saveTasks();
            this.render();
            this.showToast('Task updated!', 'success');
            return true;
        }
        return false;
    }

    // Clear all completed tasks
    clearCompleted() {
        const completedTasks = this.tasks.filter(t => t.status === 'completed');
        if (completedTasks.length === 0) {
            this.showToast('No completed tasks to clear!', 'warning');
            return;
        }
        this.tasks = this.tasks.filter(t => t.status === 'pending');
        this.saveTasks();
        this.render();
        this.showToast(`Cleared ${completedTasks.length} completed tasks!`, 'success');
    }

    // Delete all tasks
    deleteAllTasks() {
        if (this.tasks.length === 0) {
            this.showToast('No tasks to delete!', 'warning');
            return;
        }
        if (confirm('⚠️ Are you sure you want to delete ALL tasks? This action cannot be undone!')) {
            this.tasks = [];
            this.saveTasks();
            this.render();
            this.showToast('All tasks deleted!', 'danger');
        }
    }

    // Get pending tasks
    getPendingTasks() {
        return this.tasks.filter(task => task.status === 'pending');
    }

    // Get completed tasks
    getCompletedTasks() {
        return this.tasks.filter(task => task.status === 'completed');
    }

    // Render task item HTML
    renderTaskItem(task, isPending) {
        return `
            <div class="task-item ${task.status === 'completed' ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-content">
                    <div class="task-check">
                        <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} class="task-checkbox">
                    </div>
                    <div class="task-details">
                        <div class="task-text">${this.escapeHtml(task.text)}</div>
                        <div class="task-meta">
                            <span><i class="fas fa-plus-circle"></i> Added: ${this.formatDate(task.createdAt)}</span>
                            ${task.completedAt ? `<span><i class="fas fa-check-circle"></i> Completed: ${this.formatDate(task.completedAt)}</span>` : ''}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="edit-btn" title="Edit Task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" title="Delete Task">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Render all tasks
    render() {
        const pendingTasks = this.getPendingTasks();
        const completedTasks = this.getCompletedTasks();

        // Update counts
        document.getElementById('pendingCount').textContent = pendingTasks.length;
        document.getElementById('completedCount').textContent = completedTasks.length;
        document.getElementById('totalCount').textContent = this.tasks.length;
        document.getElementById('pendingBadge').textContent = pendingTasks.length;
        document.getElementById('completedBadge').textContent = completedTasks.length;

        // Render pending tasks
        const pendingContainer = document.getElementById('pendingTasksList');
        if (pendingTasks.length === 0) {
            pendingContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-smile-wink"></i>
                    <p>No pending tasks! You're all caught up 🎉</p>
                </div>
            `;
        } else {
            pendingContainer.innerHTML = pendingTasks.map(task => this.renderTaskItem(task, true)).join('');
        }

        // Render completed tasks
        const completedContainer = document.getElementById('completedTasksList');
        if (completedTasks.length === 0) {
            completedContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <p>No completed tasks yet. Get started!</p>
                </div>
            `;
        } else {
            completedContainer.innerHTML = completedTasks.map(task => this.renderTaskItem(task, false)).join('');
        }

        // Attach event listeners to dynamically created elements
        this.attachTaskEvents();
    }

    // Attach events to task buttons
    attachTaskEvents() {
        // Checkbox events
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskItem = e.target.closest('.task-item');
                const taskId = parseInt(taskItem.dataset.id);
                this.toggleTaskStatus(taskId);
            });
        });

        // Edit button events
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskItem = e.target.closest('.task-item');
                const taskId = parseInt(taskItem.dataset.id);
                const task = this.tasks.find(t => t.id === taskId);
                if (task) {
                    this.openEditModal(taskId, task.text);
                }
            });
        });

        // Delete button events
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskItem = e.target.closest('.task-item');
                const taskId = parseInt(taskItem.dataset.id);
                if (confirm('Delete this task?')) {
                    this.deleteTask(taskId);
                }
            });
        });
    }

    // Open edit modal
    openEditModal(id, currentText) {
        this.currentEditId = id;
        const modal = document.getElementById('editModal');
        const input = document.getElementById('editTaskInput');
        input.value = currentText;
        modal.style.display = 'block';
        input.focus();
        input.select();
    }

    // Close edit modal
    closeEditModal() {
        const modal = document.getElementById('editModal');
        modal.style.display = 'none';
        this.currentEditId = null;
    }

    // Show toast notification
    showToast(message, type = 'info') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            danger: '🗑️'
        };
        
        toast.innerHTML = `
            <span>${icons[type] || 'ℹ️'}</span>
            <span>${message}</span>
        `;
        
        // Add styles dynamically
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'danger' ? '#ef4444' : type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#4f46e5'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Initialize event listeners
    init() {
        // Add task button
        const addBtn = document.getElementById('addTaskBtn');
        const taskInput = document.getElementById('taskInput');
        
        addBtn.addEventListener('click', () => {
            if (this.addTask(taskInput.value)) {
                taskInput.value = '';
                taskInput.focus();
            }
        });
        
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (this.addTask(taskInput.value)) {
                    taskInput.value = '';
                    taskInput.focus();
                }
            }
        });
        
        // Clear completed button
        document.getElementById('clearCompletedBtn').addEventListener('click', () => {
            this.clearCompleted();
        });
        
        // Delete all button
        document.getElementById('deleteAllBtn').addEventListener('click', () => {
            this.deleteAllTasks();
        });
        
        // Modal close events
        const modal = document.getElementById('editModal');
        const closeBtn = document.querySelector('.close-modal');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const saveBtn = document.getElementById('saveEditBtn');
        
        closeBtn.addEventListener('click', () => this.closeEditModal());
        cancelBtn.addEventListener('click', () => this.closeEditModal());
        saveBtn.addEventListener('click', () => {
            const newText = document.getElementById('editTaskInput').value;
            if (this.editTask(this.currentEditId, newText)) {
                this.closeEditModal();
            }
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeEditModal();
            }
        });
        
        // Initial render
        this.render();
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});