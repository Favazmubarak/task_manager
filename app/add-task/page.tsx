"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title.trim()) return setError("Title is required.");

    setLoading(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Failed to create task");
        setLoading(false);
        return;
      }

      setSuccess("Task created successfully!");
      setTitle("");
      setDescription("");

      // Optional: auto-redirect after 1.5 seconds
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1f2937", padding: 20 }}>
      <div style={{ maxWidth: 680, width: "100%", background: "#111", borderRadius: 12, padding: 24, boxShadow: "0 6px 24px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#fff" }}>Create Task</h1>
          <Link href="/" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>Back</Link>
        </div>

        {error && <div style={{ marginBottom: 12, color: "#f87171", fontWeight: 500 }}>{error}</div>}
        {success && <div style={{ marginBottom: 12, color: "#22c55e", fontWeight: 500 }}>{success}</div>}

        <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #374151",
              fontSize: 15,
              background: "#1f2937",
              color: "#fff",
              outline: "none",
            }}
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #374151",
              fontSize: 15,
              background: "#1f2937",
              color: "#fff",
              outline: "none",
            }}
          />

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px 16px",
                borderRadius: 8,
                border: "none",
                background: "#3b82f6",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                flex: 1,
                fontWeight: 600,
              }}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>

            <button
              type="button"
              onClick={() => { router.push("/"); router.refresh(); }}
              style={{
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #374151",
                background: "#1f2937",
                color: "#fff",
                cursor: "pointer",
                flex: 1,
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
