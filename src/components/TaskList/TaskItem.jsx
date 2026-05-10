const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    const priorityColors = {
        low: "border-l-green-400",
        medium: "border-l-yellow-400",
        high: "border-l-red-400",
    };

    return (
        <li
            className={`group cursor-default flex items-center gap-2 sm:gap-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 ${
                priorityColors[task.priority] || "border-l-gray-300"
            } ${
                task.completed ? "opacity-70" : ""
            }`}
        >
            {/* چک‌باکس شخصی‌سازی‌شده و اطلاعات */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 py-2.5 px-2 sm:px-3">
                {/* checkbox سفارشی (گرد و با تیک زیبا) */}
                <label className="relative shrink-0 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        className="sr-only peer"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-gray-300 hover:border-emerald-400"
                    }`}>
                        {task.completed && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </label>

                {/* عنوان و تاریخ/زمان */}
                <div className="flex flex-col min-w-0">
                    <span
                        className={`text-sm sm:text-base font-medium wrap-break-word ${
                            task.completed
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                        }`}
                    >
                        {task.title}
                    </span>
                    {(task.date || task.time) && (
                        <span className="text-xs text-gray-400 mt-0.5">
                            {task.date && `📅 ${task.date}`}
                            {task.date && task.time && " · "}
                            {task.time && `⏰ ${task.time}`}
                        </span>
                    )}
                </div>
            </div>

            {/* دکمه‌های اکشن (با جداکننده) */}
            <div className="flex items-center gap-0.5 sm:gap-1 pr-2 sm:pr-3 border-l border-gray-100 pl-1 sm:pl-2 shrink-0">
                <button
                    onClick={() => onEdit(task)}
                    title="ویرایش"
                    className="p-1.5 cursor-pointer sm:p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    title="حذف"
                    className="p-1.5 cursor-pointer sm:p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </li>
    );
};

export default TaskItem;