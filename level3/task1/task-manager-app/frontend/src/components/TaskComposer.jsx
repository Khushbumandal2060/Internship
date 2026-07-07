import { useEffect, useState } from "react";

const EMPTY = { title: "", description: "", status: "todo", dueDate: "" };

export default function TaskComposer({ editingTask, onSubmit, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "todo",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : "",
      });
    } else {
      setForm(EMPTY);
    }
  }, [editingTask]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Give the task a title before saving.");
      return;
    }
    setError("");
    await onSubmit({ ...form, dueDate: form.dueDate || null });
    setForm(EMPTY);
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer__row">
        <input
          className="composer__title"
          placeholder="What needs doing?"
          value={form.title}
          onChange={handleChange("title")}
        />
        <input
          type="date"
          className="composer__date"
          value={form.dueDate}
          onChange={handleChange("dueDate")}
        />
      </div>

      <textarea
        className="composer__desc"
        placeholder="Add a note (optional)"
        rows={2}
        value={form.description}
        onChange={handleChange("description")}
      />

      <div className="composer__row composer__row--actions">
        <select value={form.status} onChange={handleChange("status")} className="composer__status">
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>

        <div className="composer__buttons">
          {editingTask && (
            <button type="button" className="btn btn--ghost" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn--primary">
            {editingTask ? "Save changes" : "Add task"}
          </button>
        </div>
      </div>

      {error && <p className="composer__error">{error}</p>}
    </form>
  );
}
