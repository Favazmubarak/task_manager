import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Tasks";

export async function GET(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();
    if (!id) return NextResponse.json({ message: "Task ID missing" }, { status: 400 });

    await connectDB();
    const task = await Task.findById(id);
    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch task" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();
    if (!id) return NextResponse.json({ message: "Task ID missing" }, { status: 400 });

    await connectDB();
    const task = await Task.findByIdAndDelete(id);
    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();
    if (!id) return NextResponse.json({ message: "Task ID missing" }, { status: 400 });

    const body = await req.json();
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.completed !== undefined) updateData.completed = body.completed;

    await connectDB();
    const task = await Task.findByIdAndUpdate(id, updateData, { new: true });
    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
  }
}
