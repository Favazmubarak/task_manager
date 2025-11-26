"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return alert("Full Name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Enter a valid email");
    if (password.length < 6) return alert("Password must be at least 6 characters");

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.message || "Registration failed");

      alert("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "420px",
          padding: "40px",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>
          Create Your Account
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "16px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "15px",
            color: "#111827",
            background: "#f9fafb",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "16px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "15px",
            color: "#111827",
            background: "#f9fafb",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "16px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "15px",
            color: "#111827",
            background: "#f9fafb",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: 600,
            color: "#ffffff",
            background: "#111827", // black color as requested
            transition: "background 0.2s",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={{ marginTop: "16px", fontSize: "14px", textAlign: "center", color: "#4b5563" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#111827", fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
