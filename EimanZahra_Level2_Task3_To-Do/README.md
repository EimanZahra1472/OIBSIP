# TaskFlow - Smart To-Do App

## Description
A feature-rich to-do application that allows users to manage daily tasks with pending/completed sections, edit/delete functionality, and timestamp tracking for when tasks are added and completed.

## Technologies Used
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+ (OOP, LocalStorage)
- Font Awesome Icons

## File Structure
Level2_Task3_TodoApp/
├── index.html # HTML structure
├── style.css # All styling
├── script.js # JavaScript logic (OOP)
└── README.md # Documentation

## Features
- ✅ **Add Tasks** - Create new tasks with enter key or button
- ✅ **Pending Tasks Section** - All incomplete tasks
- ✅ **Completed Tasks Section** - Successfully completed tasks
- ✅ **Mark Complete** - Checkbox to toggle task status
- ✅ **Edit Tasks** - Modify existing task text via modal
- ✅ **Delete Tasks** - Remove individual tasks
- ✅ **Timestamp Tracking** - Shows when task was added and completed
- ✅ **Statistics Dashboard** - Pending, Completed, Total counts
- ✅ **Clear Completed** - Remove all completed tasks at once
- ✅ **Delete All** - Remove all tasks (with confirmation)
- ✅ **Local Storage** - Persists data across page reloads
- ✅ **Toast Notifications** - User feedback for actions
- ✅ **Responsive Design** - Works on all devices
- ✅ **Modal Editing** - Clean edit interface
- ✅ **Empty States** - Friendly messages when no tasks

## Statistics Dashboard
| Stat | Description |
|------|-------------|
| Pending | Number of incomplete tasks |
| Completed | Number of finished tasks |
| Total | All tasks combined |

## Task Metadata
- **Added Date/Time** - When task was created
- **Completed Date/Time** - When task was marked done (if completed)

## How to Run
1. Save all files in the same folder
2. Open `index.html` in any modern browser
3. No server or dependencies required
4. Tasks are automatically saved to localStorage

## Usage Guide
1. **Add Task**: Type in input field and click "Add Task" or press Enter
2. **Complete Task**: Click checkbox next to task
3. **Edit Task**: Click edit (pencil) icon on any task
4. **Delete Task**: Click delete (trash) icon on any task
5. **Clear Completed**: Click "Clear Completed" button
6. **Delete All**: Click "Delete All Tasks" button (with confirmation)

## Keyboard Shortcuts
- **Enter** - Add new task
- **Escape** - Close edit modal

## Data Persistence
All tasks are saved to browser's localStorage. Your tasks will remain even after closing the browser.

## Example Flow
1. Add "Buy groceries" → appears in Pending
2. Add "Finish report" → appears in Pending  
3. Check "Buy groceries" → moves to Completed
4. Edit "Finish report" → change text
5. Delete completed tasks → Clear Completed

## Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px  
- Mobile: 480px - 767px

## Live Demo
Open locally or deploy to GitHub Pages