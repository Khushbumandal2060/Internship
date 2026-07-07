const STATUS_ORDER = ["todo", "in-progress", "done"];
const STATUS_LABEL = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

function formatDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function TaskCard({ task, onAdvance, onEdit, onDelete }) {
  const dueLabel = formatDate(task.dueDate);
  const nextIndex = (STATUS_ORDER.indexOf(task.status) + 1) % STATUS_ORDER.length;
  const nextStatus = STATUS_ORDER[nextIndex];

  return (
    <div className={`task-card status-${task.status}`}>
      <div className="task-card__top">
        <button
          className="stamp"
          title={`Mark as ${STATUS_LABEL[nextStatus]}`}
          onClick={() => onAdvance(task, nextStatus)}
        >
          {STATUS_LABEL[task.status]}
        </button>
        {dueLabel && <span className="task-card__due">DUE {dueLabel}</span>}
      </div>

      <h3 className="task-card__title">{task.title}</h3>
      {task.description && <p className="task-card__desc">{task.description}</p>}

      <div className="task-card__actions">
        <button className="link-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="link-btn link-btn--danger" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </div>
  );
}
