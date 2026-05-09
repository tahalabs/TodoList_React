import { useState } from "react";
import TaskList from "../TaskList/TaskList";
import AddTaskModal from "../AddTaskModal/AddTaskModal";

const TaskContainer = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addTask = (taskData) => {
        const newTask = {
            id: Date.now(),
            title: taskData.title,
            date: taskData.date,
            time: taskData.time,
            priority: taskData.priority || "undefind",
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                برنامه وظایف من
            </h1>

            <div className="flex justify-center mb-4 md:mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all"
                >
                    + Add Task
                </button>
            </div>

            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

            {isModalOpen && (
                <AddTaskModal
                    onAdd={addTask}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default TaskContainer;