import { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import {
  getTasks,
  setTasks,
  getUsername,
  clearUsername,
} from "./utils/localStorage";
import "./styles/App.css";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getDarkPref() {
  const v = localStorage.getItem("darkMode");
  if (v === "true") return true;
  if (v === "false") return false;
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function getAllTags(tasks) {
  const set = new Set();
  tasks.forEach((t) => (t.categories || []).forEach((tag) => set.add(tag)));
  return Array.from(set);
}

export default function App() {
  const [username, setUsername] = useState(getUsername());
  const [tasks, setTasksState] = useState(getTasks());
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(getDarkPref());
  const [tagFilter, setTagFilter] = useState("");
  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);
  useEffect(() => {
    if (username) localStorage.setItem("username", username);
  }, [username]);
  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    document.body.style.background = dark ? "#181a1b" : "#f6f7fb";
    document.body.style.color = dark ? "#eee" : "#222";
  }, [dark]);
  const handleLogin = (name) => setUsername(name);
  const handleLogout = () => {
    clearUsername();
    setUsername("");
  };
  const handleAddTask = (data) => {
    if (editingTask) {
      setTasksState(
        tasks.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t))
      );
      setEditingTask(null);
    } else {
      setTasksState([
        {
          id: generateId(),
          title: data.title,
          description: data.description,
          completed: false,
          createdAt: Date.now(),
          priority: data.priority,
          dueDate: data.dueDate,
          categories: data.categories,
        },
        ...tasks,
      ]);
    }
  };
  const handleToggle = (id) => {
    setTasksState(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };
  const handleEdit = (task) => setEditingTask(task);
  const handleDelete = (id) => {
    if (window.confirm("Delete this task?"))
      setTasksState(tasks.filter((t) => t.id !== id));
  };
  let filteredTasks = (
    filter === "all"
      ? tasks
      : tasks.filter((t) =>
          filter === "completed" ? t.completed : !t.completed
        )
  ).filter((t) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q))
    );
  });
  if (tagFilter)
    filteredTasks = filteredTasks.filter((t) =>
      (t.categories || []).includes(tagFilter)
    );
  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };
  const allTags = getAllTags(tasks);
  if (!username) return <Login onLogin={handleLogin} />;
  return (
    <div className={`app-container${dark ? " dark" : ""}`}>
      <div className="header">
        <div>Welcome, {username}</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="logout-btn" onClick={() => setDark((d) => !d)}>
            {dark ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
      <TaskForm
        onSave={handleAddTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks"
        className="task-search-input"
        style={{
          marginBottom: 16,
          width: "100%",
          padding: "8px",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />
      {allTags.length > 0 && (
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          style={{
            marginBottom: 16,
            padding: "8px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "100%",
          }}
        >
          <option value="">All Categories/Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      )}
      <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
