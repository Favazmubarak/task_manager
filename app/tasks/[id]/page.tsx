import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Tasks";
import mongoose from "mongoose";

// Helper to get task ID
const getIdFromUrl = (req: NextRequest) => {
  const { pathname } = new URL(req.url);
  return pathname.split("/").pop();
};

// GET single task
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getIdFromUrl(req);
  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });

  try {
    await connectDB();
    const task = await Task.findById(id);
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
    if (task.user.toString() !== session.user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

// PATCH task (update title/description or toggle completed)
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getIdFromUrl(req);
  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });

  try {
    const body = await req.json();
    await connectDB();

    const task = await Task.findById(id);
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
    if (task.user.toString() !== session.user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // Update fields
    if (body.title !== undefined) task.title = body.title;
    if (body.description !== undefined) task.description = body.description;
    if (body.completed !== undefined) task.completed = body.completed;

    await task.save();
    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// DELETE task
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getIdFromUrl(req);
  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });

  try {
    await connectDB();
    const task = await Task.findById(id);
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
    if (task.user.toString() !== session.user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
