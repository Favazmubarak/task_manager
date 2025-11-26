import { getServerSession } from "next-auth";
import Task from "@/models/Tasks";
import { connectDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    if (!id) return NextResponse.json({ message: "Task ID missing" }, { status: 400 });

    const body = await req.json();
    const { title, description, completed } = body;

    await connectDB();
    
    // First verify the task belongs to this user
    const task = await Task.findOne({ _id: id, user: session.user.id });
    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    // Update only the fields that were provided
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    if (!id) return NextResponse.json({ message: "Task ID missing" }, { status: 400 });

    await connectDB();
    
    // Only delete if task belongs to this user
    const task = await Task.findOneAndDelete({ _id: id, user: session.user.id });

    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    if (!id) return NextResponse.json({ message: "Task ID missing" }, { status: 400 });

    await connectDB();
    
    // Only get task if it belongs to this user
    const task = await Task.findOne({ _id: id, user: session.user.id });

    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch task" }, { status: 500 });
  }
}