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

export default function App() {
  const [username, setUsername] = useState(getUsername());
  const [tasks, setTasksState] = useState(getTasks());
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);
  useEffect(() => {
    if (username) localStorage.setItem("username", username);
  }, [username]);
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
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) =>
          filter === "completed" ? t.completed : !t.completed
        );
  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };
  if (!username) return <Login onLogin={handleLogin} />;
  return (
    <div className="app-container">
      <div className="header">
        <div>Welcome, {username}</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <TaskForm
        onSave={handleAddTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />
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
