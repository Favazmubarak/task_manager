
import { getServerSession } from "next-auth";
import Link from "next/link";
import LoggedInHomePage from "@/components/LoggedInHomePage";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
 
  const session = await getServerSession(authOptions);


  if (!session) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>You are not logged in</h1>
        <p>Please login to view your tasks.</p>
        <Link 
          href="/api/auth/signin"
          style={{
            display: "inline-block",
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </div>
    );
  }

  // Logged in - let client component handle data fetching
  // This is a good compromise: auth check is server-side (fast),
  // but task fetching uses your existing working code
  return <LoggedInHomePage />;
}