"use client";
import { useState } from "react";

interface TaskFormProps {
  onSubmit: (task: { title: string; description?: string }) => void;
  initialTitle?: string;
  initialDescription?: string;
}

export default function TaskForm({ onSubmit, initialTitle = "", initialDescription = "" }: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: "#2563eb",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
}
