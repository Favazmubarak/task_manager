// "use client";

// interface TaskCardProps {
//   task: {
//     _id: string;
//     title: string;
//     description?: string;
//     completed: boolean;
//   };
//   onToggleCompleted?: () => void;
// }

// export default function TaskCard({ task, onToggleCompleted }: TaskCardProps) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "16px",
//         borderRadius: "12px",
//         background: task.completed ? "#e0f7fa" : "#fff",
//         border: "1px solid #ddd",
//       }}
//     >
//       <div>
//         <h3
//           style={{
//             fontWeight: 600,
//             color: "#111",
//             textDecoration: task.completed ? "line-through" : "none",
//           }}
//         >
//           {task.title}
//         </h3>
//         {task.description && <p style={{ color: "#555" }}>{task.description}</p>}
//       </div>

//       {onToggleCompleted && (
//         <input
//           type="checkbox"
//           checked={task.completed}
//           onChange={onToggleCompleted}
//           style={{ width: "20px", height: "20px" }}
//         />
//       )}
//     </div>
//   );
// }



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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderRadius: "12px",
        background: task.completed ? "#e0f7fa" : "#fff",
        border: "1px solid #ddd",
      }}
    >
      <div>
        <h3
          style={{
            fontWeight: 600,
            color: "#111",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </h3>
        {task.description && <p style={{ color: "#555" }}>{task.description}</p>}
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {onToggleCompleted && (
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggleCompleted}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#fbbf24",
              color: "#111",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#ef4444",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
