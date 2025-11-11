// taskControllers.mjs
import Task from "../models/taskModel.mjs";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error during fetch of tasks", error: error.message });
  }
};

export const addTasks = async (req, res) => {
  try {
    const newTask = new Task({
      text: req.body.text,
      dueTime: req.body.dueTime,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(400)
      .json({ message: "error during add of tasks", error: error.message });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Task has been deleted" });
  } catch (error) {
    res.status(400).json({ msg: "error deleting task", error: error.message });
  }
};
