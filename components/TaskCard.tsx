// components/TaskCard.tsx
"use client";

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
  };
  onToggleCompleted?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskCard({ task, onToggleCompleted, onEdit, onDelete }: TaskCardProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, borderRadius: 12, background: task.completed ? "#e0f7fa" : "#fff", border: "1px solid #ddd" }}>
      <div>
        <h3 style={{ fontWeight: 600, color: "#111", textDecoration: task.completed ? "line-through" : "none", margin: 0 }}>{task.title}</h3>
        {task.description && <p style={{ color: "#555", margin: "6px 0 0" }}>{task.description}</p>}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {onToggleCompleted && <input type="checkbox" checked={task.completed} onChange={onToggleCompleted} style={{ width: 20, height: 20, cursor: "pointer" }} />}
        {onEdit && <button onClick={onEdit} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: "#fbbf24", cursor: "pointer" }}>Edit</button>}
        {onDelete && <button onClick={onDelete} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: "#ef4444", color: "#fff", cursor: "pointer" }}>Delete</button>}
      </div>
    </div>
  );
}
