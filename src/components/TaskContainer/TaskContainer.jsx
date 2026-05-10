import { useEffect, useState } from "react";
import TaskList from "../TaskList/TaskList";
import AddTaskModal from "../AddTaskModal/AddTaskModal";

const TaskContainer = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [filter, setFilter] = useState("all");
    const [editingTask, setEditingTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // فیلتر
    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    });

    // مرتب‌سازی
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        const priorityWeight = { high: 3, medium: 2, low: 1, undefind: 0 };
        let compare = 0;
        if (sortBy === "date") {
            if (!a.date && !b.date) compare = 0;
            else if (!a.date) compare = 1;
            else if (!b.date) compare = -1;
            else compare = a.date.localeCompare(b.date);
        } else if (sortBy === "priority") {
            const wA = priorityWeight[a.priority] || 0;
            const wB = priorityWeight[b.priority] || 0;
            compare = wB - wA; // high -> low
        } else if (sortBy === "completed") {
            compare = Number(a.completed) - Number(b.completed);
        }
        return sortOrder === "desc" ? -compare : compare;
    });

    // تابع ذخیره (افزودن یا ویرایش)
    const handleSave = (taskData) => {
        if (editingTask) {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === editingTask.id ? { ...task, ...taskData } : task
                )
            );
        } else {
            const newTask = {
                id: Date.now(),
                title: taskData.title,
                date: taskData.date,
                time: taskData.time,
                priority: taskData.priority || "undefind",
                completed: false,
            };
            setTasks((prev) => [...prev, newTask]);
        }
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* هدر */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-2xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">📋 برنامه وظایف من</h1>
                        <p className="text-xs sm:text-sm text-gray-500">مدیریت وظایف روزانه</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="hidden sm:inline-flex bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                        + وظیفه جدید
                    </button>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-4 sm:py-6">
                {/* نوار ابزار: فیلتر و مرتب‌سازی */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 ">
                    {/* فیلترها */}
                    <div className="flex gap-1.5 bg-white rounded-xl p-1 shadow-sm w-fit ">
                        {[
                            { key: "all", label: "همه" },
                            { key: "incomplete", label: "انجام‌نشده" },
                            { key: "completed", label: "انجام‌شده" },
                        ].map((item) => (
                            <button
                                key={item.key}
                                onClick={() => setFilter(item.key)}
                                className={`px-3 py-1.5 text-xs sm:text-sm cursor-pointer font-medium rounded-lg transition-all ${
                                    filter === item.key
                                        ? "bg-blue-500 text-white shadow"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* مرتب‌سازی */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="date">📅 تاریخ</option>
                            <option value="priority">⚠️ اولویت</option>
                            <option value="completed">✅ وضعیت</option>
                        </select>
                        <button
                            onClick={() => setSortOrder((p) => (p === "asc" ? "desc" : "asc"))}
                            className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 hover:bg-gray-50"
                        >
                            {sortOrder === "asc" ? "↑ صعودی" : "↓ نزولی"}
                        </button>
                    </div>
                </div>



                {/* لیست وظایف */}
                <TaskList
                    tasks={sortedTasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={handleEdit}
                />
            </main>

            {/* دکمه شناور (FAB) برای موبایل */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all active:scale-95 z-50"
            >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {/* مودال */}
            {isModalOpen && (
                <AddTaskModal
                    onSave={handleSave}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingTask(null);
                    }}
                    task={editingTask}
                />
            )}
        </div>
    );
};

export default TaskContainer;