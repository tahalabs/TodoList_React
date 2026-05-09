const TaskItem = ({ task, onToggle, onDelete }) => {
    const priorityColors = {
        low: "border-l-green-400",
        medium: "border-l-yellow-400",
        high: "border-l-red-400",
    };

    return (
        <li
            className={`flex items-center justify-between p-3 sm:p-4 rounded shadow border-l-4 cursor-default ${priorityColors[task.priority] || "border-l-gray-300"
                } ${task.completed
                    ? "bg-gray-200"
                    : "bg-green-200 hover:bg-green-300"
                }`}
        >
            {/* بخش چپ: چک‌باکس + اطلاعات */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="w-5 h-5 shrink-0 cursor-pointer"
                />
                {/* عنوان و تاریخ/زمان */}
                <div className="flex flex-col min-w-0">
                    <span
                        className={`text-base sm:text-lg wrap-break-word ${task.completed ? "line-through text-gray-400" : "text-gray-900"
                            }`}
                    >
                        {task.title}
                    </span>
                    {(task.date || task.time) && (
                        <span className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            {task.date && `📅 ${task.date}`}
                            {task.date && task.time && " - "}
                            {task.time && `⏰ ${task.time}`}
                        </span>
                    )}
                </div>
            </div>

            {/* دکمه حذف */}
            <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700 text-sm sm:text-base shrink-0 ml-2 transition cursor-pointer"
            >
                حذف
            </button>
        </li>
    );
};

export default TaskItem;