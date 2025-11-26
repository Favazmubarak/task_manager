// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import TaskCard from "@/components/TaskCard";

// interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   completed: boolean;
// }

// export default function LoggedInHomePage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAdd, setShowAdd] = useState(false);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [adding, setAdding] = useState(false);

//   // Fetch tasks
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await fetch("/api/tasks", { credentials: "include" })
//         if (!res.ok) throw new Error("Failed to fetch tasks");
//         const data = await res.json();
//         setTasks(data);
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching tasks");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, []);

//   // Toggle completed
//   const toggleCompleted = async (taskId: string) => {
//     try {
//       const task = tasks.find((t) => t._id === taskId);
//       if (!task) return;

//       const res = await fetch(`/api/tasks/${taskId}`, {
//         credentials: "include",
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ completed: !task.completed }),
//       });

//       if (!res.ok) throw new Error("Failed to update task");

//       setTasks((prev) =>
//         prev.map((t) =>
//           t._id === taskId ? { ...t, completed: !t.completed } : t
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Error updating task");
//     }
//   };

//   // Add new task
//   const addTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newTitle.trim()) return alert("Title is required");
//     setAdding(true);

//     try {
//       const res = await fetch("/api/tasks", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newTitle,
//           description: newDescription,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to add task");

//       setTasks((prev) => [data, ...prev]);
//       setNewTitle("");
//       setNewDescription("");
//       setShowAdd(false);
//     } catch (err) {
//       console.error(err);
//       alert("Error adding task");
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
//       <Navbar />

//       <div
//         style={{
//           maxWidth: "800px",
//           margin: "40px auto",
//           padding: "0 20px",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: "28px",
//             fontWeight: 700,
//             marginBottom: "24px",
//             color: "#111",
//           }}
//         >
//           Task List
//         </h1>

//         <button
//           onClick={() => setShowAdd(!showAdd)}
//           style={{
//             padding: "12px 20px",
//             borderRadius: "8px",
//             border: "none",
//             background: "#2563eb",
//             color: "#fff",
//             fontWeight: 600,
//             cursor: "pointer",
//             marginBottom: "16px",
//           }}
//         >
//           {showAdd ? "Cancel" : "Add Task"}
//         </button>

//         {/* Add Task Form */}
//         {showAdd && (
//           <form
//             onSubmit={addTask}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "12px",
//               marginBottom: "24px",
//               padding: "20px",
//               background: "#fff",
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//               color: "#111",
//             }}
//           >
//             <input
//               type="text"
//               placeholder="Title"
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               style={{
//                 padding: "12px",
//                 borderRadius: "8px",
//                 border: "1px solid #ddd",
//                 fontSize: "15px",
//                 color: "#111",
//               }}
//             />

//             <textarea
//               placeholder="Description (optional)"
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               style={{
//                 padding: "12px",
//                 borderRadius: "8px",
//                 border: "1px solid #ddd",
//                 fontSize: "15px",
//                 color: "#111",
//               }}
//             />

//             <button
//               type="submit"
//               disabled={adding}
//               style={{
//                 padding: "12px",
//                 borderRadius: "8px",
//                 border: "none",
//                 fontWeight: 600,
//                 background: "#2563eb",
//                 color: "#fff",
//                 cursor: adding ? "not-allowed" : "pointer",
//               }}
//             >
//               {adding ? "Adding..." : "Add Task"}
//             </button>
//           </form>
//         )}

//         {/* Task List */}
//         {loading ? (
//           <p
//             style={{
//               textAlign: "center",
//               marginTop: "40px",
//               color: "#111",
//             }}
//           >
//             Loading tasks...
//           </p>
//         ) : tasks.length === 0 ? (
//           <p
//             style={{
//               textAlign: "center",
//               marginTop: "40px",
//               color: "#111",
//             }}
//           >
//             No tasks available. Add a new one!
//           </p>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//             {tasks.map((task) => (
//               <TaskCard
//                 key={task._id}
//                 task={task}
//                 onToggleCompleted={() => toggleCompleted(task._id)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaskCard from "@/components/TaskCard";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export default function LoggedInHomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [adding, setAdding] = useState(false);

  // Edit/Delete states
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Toggle completed
  const toggleCompleted = async (taskId: string) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      if (!task) return;

      const res = await fetch(`/api/tasks/${taskId}`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  // Add new task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return alert("Title is required");
    setAdding(true);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add task");

      setTasks((prev) => [data, ...prev]);
      setNewTitle("");
      setNewDescription("");
      setShowAdd(false);
    } catch (err) {
      console.error(err);
      alert("Error adding task");
    } finally {
      setAdding(false);
    }
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  // Start editing
  const startEdit = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setShowAdd(false); // close add form if open
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDescription("");
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim() || !editingTask) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/tasks/${editingTask._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update task");

      setTasks((prev) =>
        prev.map((t) => (t._id === editingTask._id ? data : t))
      );
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px", color: "#111" }}>
          Task List
        </h1>

        <button
          onClick={() => setShowAdd(!showAdd)}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          {showAdd ? "Cancel" : "Add Task"}
        </button>

        {/* Add Task Form */}
        {showAdd && (
          <form
            onSubmit={addTask}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "24px",
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              color: "#111",
            }}
          >
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "15px",
                color: "#111",
              }}
            />

            <textarea
              placeholder="Description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "15px",
                color: "#111",
              }}
            />

            <button
              type="submit"
              disabled={adding}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                fontWeight: 600,
                background: "#2563eb",
                color: "#fff",
                cursor: adding ? "not-allowed" : "pointer",
              }}
            >
              {adding ? "Adding..." : "Add Task"}
            </button>
          </form>
        )}

        {/* Edit Task Form */}
        {editingTask && (
          <form
            onSubmit={updateTask}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "24px",
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              color: "#111",
            }}
          >
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "15px",
                color: "#111",
              }}
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "15px",
                color: "#111",
              }}
            />

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="submit"
                disabled={updating}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 600,
                  background: "#2563eb",
                  color: "#fff",
                  cursor: updating ? "not-allowed" : "pointer",
                  flex: 1,
                }}
              >
                {updating ? "Updating..." : "Update Task"}
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  background: "#f3f4f6",
                  color: "#111",
                  flex: 1,
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Task List */}
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "40px", color: "#111" }}>
            Loading tasks...
          </p>
        ) : tasks.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "40px", color: "#111" }}>
            No tasks available. Add a new one!
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggleCompleted={() => toggleCompleted(task._id)}
                onEdit={() => startEdit(task)}
                onDelete={() => deleteTask(task._id)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
