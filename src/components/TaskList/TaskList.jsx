import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <p className="text-gray-500 text-center mt-3 text-sm sm:text-base">
                هیچ وظیفه‌ای وجود ندارد
            </p>
        );
    }

    return (
        <ul className="space-y-2 sm:space-y-3 mt-5">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

export default TaskList;