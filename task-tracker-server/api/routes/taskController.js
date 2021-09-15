const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const { tasks } = new PrismaClient();

const getTasks = async (req, res) => {
  const allTasks = await tasks.findMany({
    select: {
      id: true,
      text: true,
      day: true,
      reminder: true,
    },
  });
  res.json(allTasks);
};

const getSingleTask = async (req, res) => {
  const task_id = req.params.id;
  const task = await tasks.findUnique({
    where: { id: parseInt(task_id) },
  });
  res.json(task);
};

const addTask = async (req, res) => {
  const { text, day, reminder } = req.body;

  const newTask = await tasks.create({
    data: { text, day, reminder },
  });
  res.json(newTask);
};

const toggleTask = async (req, res) => {
  const task_id = req.params.id;
  const { reminder } = req.body;

  await tasks.update({
    data: { reminder },
    where: { id: parseInt(task_id) },
  });
};

const deleteTask = async (req, res) => {
  const task_id = req.params.id;

  await tasks.delete({
    where: { id: parseInt(task_id) },
  });
};

module.exports = { getTasks, getSingleTask, addTask, toggleTask, deleteTask };
