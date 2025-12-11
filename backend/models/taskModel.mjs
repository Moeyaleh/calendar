import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  dueTime: {
    type: String,
    required: false,
  },
  userId: {
    // Add this field
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("Task", todoSchema);
export default Task;
