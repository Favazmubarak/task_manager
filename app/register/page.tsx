"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) return setError("Full Name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);

      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#111827",
        fontFamily: "Inter, Arial, sans-serif",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "420px",
          padding: "40px",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          transition: "transform 0.2s",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "24px",
            color: "#111827",
            textAlign: "center",
          }}
        >
          Create Your Account
        </div>

        {error && (
          <div style={{ marginBottom: 12, color: "#b91c1c", textAlign: "center" }}>{error}</div>
        )}
        {success && (
          <div style={{ marginBottom: 12, color: "#16a34a", textAlign: "center" }}>{success}</div>
        )}

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
            transition: "border 0.2s",
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
            transition: "border 0.2s",
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
            transition: "border 0.2s",
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
            background: "#111827",
            transition: "background 0.2s, transform 0.1s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#1f2937")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#111827")}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p
          style={{
            marginTop: "16px",
            fontSize: "14px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#111827", fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
