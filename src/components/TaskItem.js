function getPriorityColor(priority) {
  if (priority === "High") return "#e11d48";
  if (priority === "Medium") return "#f59e42";
  return "#22c55e";
}

function getTagColor(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++)
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

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
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="task-title">{task.title}</div>
            {task.priority && (
              <span
                style={{
                  background: getPriorityColor(task.priority),
                  color: "#fff",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {task.priority}
              </span>
            )}
          </div>
          {task.categories && task.categories.length > 0 && (
            <div style={{ display: "flex", gap: 6, margin: "4px 0" }}>
              {task.categories.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: getTagColor(tag),
                    color: "#fff",
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {task.description && (
            <div className="task-desc">{task.description}</div>
          )}
          <div className="task-date">
            {new Date(task.createdAt).toLocaleString()}
          </div>
          {task.dueDate && (
            <div className="task-date">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
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
