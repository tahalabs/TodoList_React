import { useEffect, useState } from "react";
import TaskList from "../TaskList/TaskList";
import AddTaskModal from "../AddTaskModal/AddTaskModal";


const TaskContainer = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [filter, setFilter] = useState("all");

    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks]);


    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    })
    const addTask = (taskData) => {
        const newTask = {
            id: Date.now(),
            title: taskData.title,
            date: taskData.date,
            time: taskData.time,
            priority: taskData.priority || "undefind",
            completed: false
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const toggleTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                برنامه وظایف من
            </h1>

            <div className="flex justify-center gap-2 mb-4 md:mb-6">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded text-sm sm:text-base font-medium cursor-pointer transition-all ${filter === "all"
                            ? "bg-blue-500 text-white shadow"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("incomplete")}
                    className={`px-4 py-2 rounded text-sm sm:text-base font-medium cursor-pointer transition-all ${filter === "incomplete"
                            ? "bg-blue-500 text-white shadow"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Incomplete
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`px-4 py-2 rounded text-sm sm:text-base font-medium cursor-pointer transition-all ${filter === "completed"
                            ? "bg-blue-500 text-white shadow"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Completed
                </button>
            </div>
            <div className="flex justify-center mb-4 md:mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 active:scale-95 cursor-pointer text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all"
                >
                    + Add Task
                </button>
            </div>

            <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />

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