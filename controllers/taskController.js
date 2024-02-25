const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({ title, description, user: req.userId });
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description }= req.body;
        const task = await Task.findOneAndUpdate({ _id: id, user: req.userId },
            { title, description },
            { new: true }
            );
            if ( !task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, user: req.userId });
        if ( !task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};