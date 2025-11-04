import Task from "../models/taskModel.mjs";

export const getTasks = async (req, res) => {
  try {
    const { date } = req.query;
    let filter = {};
    if (date) {
      const start = new Date(date + "T00:00:00.000Z");
      const end = new Date(date + "T23:59:59.999Z");
      filter.date = { $gte: start, $lte: end };
    }
    const tasks = await Task.find(filter).sort({ date: 1, createdAt: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTasks = async (req, res) => {
  try {
    const { text, date, completed = false } = req.body;
    if (!text || !date)
      return res.status(400).json({ msg: "text and date required" });

    const newTask = new Task({
      text,
      date: new Date(date),
      completed,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ msg: "can't add task", error: err.message });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "task not found" });
    res.status(200).json({ msg: "Task has been deleted" });
  } catch (err) {
    res.status(400).json({ msg: "task not found", error: err.message });
  }
};
