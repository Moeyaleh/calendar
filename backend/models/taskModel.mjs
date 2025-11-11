import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  dueTime: {
    type: String,
    required: false,
  },
});

const Task = mongoose.model("Task", todoSchema);
export default Task;
