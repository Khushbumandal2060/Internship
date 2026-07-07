import TaskCard from "./TaskCard";

const COLUMNS = [
  { key: "todo", label: "To do" },
  { key: "in-progress", label: "In progress" },
  { key: "done", label: "Done" },
];

export default function TaskBoard({ tasks, onAdvance, onEdit, onDelete }) {
  return (
    <div className="board">
      {COLUMNS.map((col) => {
        const columnTasks = tasks.filter((t) => t.status === col.key);
        return (
          <section className="column" key={col.key}>
            <header className="column__header">
              <h2>{col.label}</h2>
              <span className="column__count">{columnTasks.length}</span>
            </header>

            <div className="column__body">
              {columnTasks.length === 0 && (
                <p className="column__empty">Nothing here yet.</p>
              )}
              {columnTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onAdvance={onAdvance}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
