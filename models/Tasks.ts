    import mongoose, { Schema, model, models } from "mongoose";

    const TaskSchema = new Schema(
      {
        title: { type: String, required: true },
        description: { type: String },
        completed: { type: Boolean, default: false },
        user: { 
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        }
      },
      { timestamps: true }
    );

    const Task = models.Task || model("Task", TaskSchema);
    export default Task;
