export default function TaskFilter({ filter, setFilter, counts }) {
  return (
    <div className="task-filter">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All ({counts.all})
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed ({counts.completed})
      </button>
      <button
        className={filter === "pending" ? "active" : ""}
        onClick={() => setFilter("pending")}
      >
        Pending ({counts.pending})
      </button>
    </div>
  );
}
