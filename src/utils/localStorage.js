export function getTasks() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

export function setTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getUsername() {
  return localStorage.getItem("username") || "";
}

export function clearUsername() {
  localStorage.removeItem("username");
}
