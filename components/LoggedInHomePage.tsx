"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export default function LoggedInHomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(Array.isArray(data) ? data : data.tasks || []);
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
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, completed: !task.completed } : t
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  // Navigate to task details
  const goToTask = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  // Navigate to add task page
  const goToAddTask = () => {
    router.push("/add-task");
  };

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />

      <main style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: "#111" }}>
          Task List
        </h1>

        {/* Add Task Button */}
        <button
          onClick={goToAddTask}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            marginBottom: 20,
            cursor: "pointer",
          }}
        >
          Add Task
        </button>

        {loading ? (
          <p style={{ textAlign: "center", marginTop: 40, color: "#111" }}>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 40, color: "#111" }}>No tasks available. Add a new one!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: 8,
                  background: task.completed ? "#d1fae5" : "#fff",
                  border: "1px solid #e5e7eb",
                  cursor: "default",
                }}
              >
                <span
                  onClick={() => goToTask(task._id)}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: "#111",
                    flex: 1,
                    cursor: "pointer",
                  }}
                >
                  {task.title}
                </span>

                <button
                  onClick={() => toggleCompleted(task._id)}
                  style={{
                    marginLeft: 12,
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "none",
                    background: task.completed ? "#22c55e" : "#fbbf24",
                    color: "#fff",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {task.completed ? "Completed" : "Mark Completed"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
