import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", todoSchema);
export default Task;
