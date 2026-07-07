import { useEffect, useState } from "react";
import { api } from "./api";
import TaskComposer from "./components/TaskComposer";
import TaskBoard from "./components/TaskBoard";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await api.list();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (form) => {
    try {
      if (editingTask) {
        const updated = await api.update(editingTask._id, form);
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTask(null);
      } else {
        const created = await api.create(form);
        setTasks((prev) => [created, ...prev]);
      }
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdvance = async (task, nextStatus) => {
    try {
      const updated = await api.update(task._id, { ...task, status: nextStatus });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (task) => {
    const confirmed = window.confirm(`Delete "${task.title}"? This can't be undone.`);
    if (!confirmed) return;
    try {
      await api.remove(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      if (editingTask && editingTask._id === task._id) setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <header className="page__header">
        <p className="page__eyebrow">Level 3 · Full-Stack CRUD</p>
        <h1 className="page__title">The Ledger</h1>
        <p className="page__subtitle">
          A task manager, kept the old way — write it down, stamp it, cross it off.
        </p>
      </header>

      <TaskComposer
        editingTask={editingTask}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingTask(null)}
      />

      {error && <div className="banner banner--error">{error}</div>}

      {loading ? (
        <p className="page__loading">Fetching your tasks…</p>
      ) : (
        <TaskBoard
          tasks={tasks}
          onAdvance={handleAdvance}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
