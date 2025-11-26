"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaskCard from "@/components/TaskCard";
import LoggedInHomePage from "@/components/LoggedInHomePage";

export default function HomePage() {
  const { data: session, status } = useSession();

  // 1, while checking session
  if (status === "loading") {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;
  }

  // 2, not logged in → show simple page
  if (!session) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>You are not logged in</h1>
        <p>Please login to view your tasks.</p>
        <a 
          href="/api/auth/signin" 
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            borderRadius: "8px",
            fontWeight: 600
          }}
        >
          Login
        </a>
      </div>
    );
  }

  // 3, logged in → YOUR EXISTING CODE EXACTLY AS IT IS
  return (
    <LoggedInHomePage />
  );
}

