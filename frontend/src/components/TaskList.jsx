import { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import './TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await taskService.getTasks();
        setTasks(data);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        await taskService.createTask(newTask);
        setNewTask({ title: '', description: '' });
        loadTasks();
    };

    const handleUpdateTask = async (id, updatedTask) => {
        await taskService.updateTask(id, updatedTask);
        setEditingTask(null);
        loadTasks();  // Recarrega a lista de tarefas
    };

    const handleDeleteTask = async (id) => {
        await taskService.deleteTask(id);
        loadTasks();
    };

    const startEditing = (task) => {
        setEditingTask({ ...task });  // Cria uma cópia da task para edição
    };

    return (
        <div className="task-container">
            {/* Add Task Form */}
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    required
                />
                <input
                    type="text"
                    placeholder="Task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
                <button type="submit">Add Task</button>
            </form>

            {/* Task List */}
            <div className="tasks-list">
                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        {editingTask && editingTask.id === task.id ? (
                            // Edit Form
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateTask(task.id, editingTask);
                            }}>
                                <input
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) => setEditingTask({
                                        ...editingTask,
                                        title: e.target.value
                                    })}
                                    required
                                />
                                <input
                                    type="text"
                                    value={editingTask.description}
                                    onChange={(e) => setEditingTask({
                                        ...editingTask,
                                        description: e.target.value
                                    })}
                                />
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setEditingTask(null)}>
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            // Display Task
                            <>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <div className="task-actions">
                                    <button onClick={() => startEditing(task)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteTask(task.id)}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;