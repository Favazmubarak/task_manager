import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";       // YOU FORGOT THIS
import Task from "@/models/Tasks";
import { connectDB } from "@/lib/mongodb";

// GET all tasks
export async function GET() {
  const session = await getServerSession(authOptions);  // AND THIS

  if (!session) return Response.json([], { status: 401 });

  await connectDB();

  const tasks = await Task.find({ user: session.user.id }).sort({
    createdAt: -1,
  });

  return Response.json(tasks);
}

// CREATE task
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);  // FIXED

  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description } = await req.json();
  await connectDB();

  const task = await Task.create({
    title,
    description,
    user: session.user.id,
  });

  return Response.json(task);
}
