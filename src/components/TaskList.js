import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const [removing, setRemoving] = useState(null);
  const handleDelete = (id) => {
    setRemoving(id);
    setTimeout(() => {
      setRemoving(null);
      onDelete(id);
    }, 250);
  };
  if (!tasks.length) return <div className="no-tasks">No tasks</div>;
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={removing === task.id ? "removing" : ""}>
          <TaskItem
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}
