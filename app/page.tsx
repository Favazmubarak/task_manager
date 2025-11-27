import { getServerSession } from "next-auth";
import Link from "next/link";
import LoggedInHomePage from "@/components/LoggedInHomePage";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          backgroundColor: "#111",
          color: "#f9f9f9",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            marginBottom: "16px",
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Welcome
        </h1>
        <p
          style={{
            marginBottom: "32px",
            fontSize: "1.1rem",
            textAlign: "center",
            color: "#ccc",
          }}
        >
          Please log in to access your tasks
        </p>

        <Link
          href="/api/auth/signin"
          style={{
            padding: "12px 24px",
            backgroundColor: "#f9f9f9",
            color: "#111",
            fontWeight: 600,
            borderRadius: "8px",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          className="hover:bg-gray-200"
        >
          Login
        </Link>
      </div>
    );
  }

  return <LoggedInHomePage />;
}
