"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export default function TaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch task");
        const data = await res.json();
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || "");
      } catch (err) {
        console.error(err);
        alert("Error fetching task");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const toggleCompleted = async () => {
    if (!task) return;

    setTask((prev) =>
      prev ? { ...prev, completed: !prev.completed } : prev
    );

    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error("Failed to toggle");
      const data = await res.json();
      setTask(data);
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const data = await res.json();
      setTask(data);
      setEditing(false);
      setSuccess("Task updated successfully!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    } finally {
      setUpdating(false);
    }
  };

  const deleteTask = async () => {
    if (!task || !confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-black font-medium">Loading task...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-black font-medium">Task not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-xl mx-auto p-6">
        <div
          className={`bg-white rounded-xl shadow-lg p-6 transition-colors duration-300 ${
            task.completed ? "bg-green-50" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h1
              className={`text-2xl font-bold ${
                task.completed ? "line-through text-gray-600" : "text-black"
              }`}
            >
              {task.title}
            </h1>
            <button
              onClick={toggleCompleted}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                task.completed
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
              }`}
            >
              {task.completed ? "Completed" : "Mark Completed"}
            </button>
          </div>

          {success && <p className="mb-4 text-green-600 font-medium">{success}</p>}

          {editing ? (
            <form onSubmit={updateTask} className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="border border-gray-300 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={updating}
                  className={`flex-1 px-4 py-2 rounded-md font-semibold text-white ${
                    updating ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {updating ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 px-4 py-2 rounded-md font-semibold text-black border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className={`text-black ${task.completed ? "text-gray-700 line-through" : ""} mb-4`}>
              {task.description || "No description"}
            </p>
          )}

          {!editing && (
            <div className="flex gap-3">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={deleteTask}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
