export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-item${task.completed ? " completed" : ""}`}>
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <div className="task-info">
          <div className="task-title">{task.title}</div>
          {task.description && (
            <div className="task-desc">{task.description}</div>
          )}
          <div className="task-date">
            {new Date(task.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button className="task-edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="task-delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
