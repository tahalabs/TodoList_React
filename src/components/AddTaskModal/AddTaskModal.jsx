import TaskForm from "../TaskForm/TaskForm";

const AddTaskModal = ({ onSave, onClose, task }) => {
    // فقط ذخیره را به والد می‌فرستد، بستن مودال توسط TaskContainer انجام می‌شود
    const handleSubmit = (taskData) => {
        onSave(taskData);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg w-full max-w-md sm:max-w-lg p-4 sm:p-6 shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">
                    {task ? "Edit Task" : "Add New Task"}
                </h2>
                <TaskForm onAdd={handleSubmit} initialTask={task} />
            </div>
        </div>
    );
};

export default AddTaskModal;