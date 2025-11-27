// app/tasks/[id]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Tasks";
import { notFound, redirect } from "next/navigation";

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  await connectDB();

  const task = await Task.findOne({
    _id: params.id,
    user: session.user.id,
  });

  if (!task) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
        {task.description && (
          <p className="text-gray-600 mb-4">{task.description}</p>
        )}
        <div className="text-sm text-gray-500">
          Status: {task.completed ? "Completed" : "Pending"}
        </div>
      </div>
    </div>
  );
}