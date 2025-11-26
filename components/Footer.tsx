export default function Footer() {
  return (
    <footer style={{
      padding: "16px 32px",
      textAlign: "center",
      background: "#f3f4f6",
      color: "#4b5563",
      marginTop: "40px",
    }}>
      &copy; {new Date().getFullYear()} Task Tracker. All rights reserved.
    </footer>
  );
}
