// /app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Tasks"; // your mongoose Task model
import { connectDB } from "@/lib/mongodb";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = params;
  const body = await req.json();

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { completed: body.completed },
      { new: true }
    );

    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json(task);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}
