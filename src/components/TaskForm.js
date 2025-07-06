import { useState, useEffect } from "react";

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [categories, setCategories] = useState("");
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Medium");
      setDueDate(editingTask.dueDate || "");
      setCategories(
        editingTask.categories ? editingTask.categories.join(", ") : ""
      );
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setCategories("");
    }
  }, [editingTask]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
        categories: categories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setCategories("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="task-title-input"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="task-desc-input"
      />
      <div style={{ display: "flex", gap: 8 }}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="task-priority-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="task-due-date-input"
        />
      </div>
      <input
        type="text"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        placeholder="Categories/tags (comma separated)"
        className="task-title-input"
        style={{ marginTop: 8 }}
      />
      <div className="task-form-actions">
        <button type="submit" className="task-save-btn">
          {editingTask ? "Update" : "Add"} Task
        </button>
        {editingTask && (
          <button type="button" className="task-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
