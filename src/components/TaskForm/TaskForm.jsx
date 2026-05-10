import { useState, useEffect } from "react";

const TaskForm = ({ onAdd, initialTask }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [taskPriority, setTaskPriority] = useState("");

    // هرگاه initialTask تغییر کند (یعنی یک تسک برای ویرایش کلیک شود)، فیلدها را پر کن
    useEffect(() => {
        if (initialTask) {
            setTaskTitle(initialTask.title);
            setDate(initialTask.date || "");
            setTime(initialTask.time || "");
            setTaskPriority(initialTask.priority || "");
        }
    }, [initialTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim() === "") return;
        onAdd({ title: taskTitle, date, time, priority: taskPriority });
        // بعد از ثبت، فیلدها را خالی نکن! چون اگر ویرایش باشد، مودال بسته می‌شود و کامپوننت unmount می‌شود.
        // اگر افزودن جدید باشد، با باز شدن دوباره مودال، initialTask برابر null است و useEffect خالی می‌کند.
    };

    return (
        <form
            className="w-full mt-5 mx-auto max-w-sm border-green-500 border rounded-2xl p-5 bg-green-200"
            onSubmit={handleSubmit}
        >
            {/* Title */}
            <div className="flex flex-col mb-4">
                <label className="text-gray-500 font-bold mb-1" htmlFor="task-title">
                    Title
                </label>
                <input
                    id="task-title"
                    type="text"
                    placeholder="Task title ..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="bg-gray-50 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            {/* Date & Time */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex flex-col flex-1">
                    <label className="text-gray-500 font-bold mb-1" htmlFor="task-date">
                        Date
                    </label>
                    <input
                        id="task-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-gray-50 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label className="text-gray-500 font-bold mb-1" htmlFor="task-time">
                        Time
                    </label>
                    <input
                        id="task-time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-gray-50 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    />
                </div>
            </div>

            {/* Priority */}
            <div className="flex flex-col mb-4">
                <label className="text-gray-500 font-bold mb-1" htmlFor="task-priority">
                    Priority
                </label>
                <select
                    id="task-priority"
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="bg-gray-50 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
                >
                    <option value="" disabled hidden>
                        Select priority
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Submit / Update button */}
            <div className="flex justify-center mt-4">
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow transition capitalize cursor-pointer"
                >
                    {initialTask ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;