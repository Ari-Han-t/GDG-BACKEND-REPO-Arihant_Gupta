const prisma = require("../config/prisma");
const { createTaskSchema } = require("../validators/task.validator");
const logger = require("../utils/logger");

/* ================= CREATE TASK ================= */
exports.createTask = async (req, res) => {
  const parsed = createTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    logger.warn("Invalid task creation input");
    return res.status(400).json({ errors: parsed.error.errors });
  }

  const { title, description, priority, deadline, recurrence } = parsed.data;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      deadline: new Date(deadline),
      recurrence,
      userId: req.userId,
    },
  });

  logger.info(`Task created by user ${req.userId}: ${title}`);
  res.status(201).json(task);
};

/* ================= GET TASKS ================= */
exports.getTasks = async (req, res) => {
  const { status, priority, search, from, to } = req.query;

  const filters = { userId: req.userId };

  if (status) filters.status = status;
  if (priority) filters.priority = priority;

  if (search) {
    filters.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  if (from || to) {
    filters.deadline = {};
    if (from) filters.deadline.gte = new Date(from);
    if (to) filters.deadline.lte = new Date(to);
  }

  const tasks = await prisma.task.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });

  const now = new Date();

  const tasksWithOverdue = tasks.map(task => ({
    ...task,
    isOverdue:
      task.status !== "COMPLETED" &&
      task.deadline < now,
  }));

  res.json(tasksWithOverdue);
};

/* ================= UPDATE TASK ================= */
exports.updateTask = async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, priority, status, deadline } = req.body;

  const task = await prisma.task.findFirst({
    where: { id: taskId, userId: req.userId },
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      description,
      priority,
      status,
      deadline: deadline ? new Date(deadline) : undefined,
    },
  });

  // ✅ Recurring task logic AFTER update
  if (task.recurrence && status === "COMPLETED") {
    let nextDeadline = new Date(task.deadline);

    if (task.recurrence === "DAILY") {
      nextDeadline.setDate(nextDeadline.getDate() + 1);
    }

    if (task.recurrence === "WEEKLY") {
      nextDeadline.setDate(nextDeadline.getDate() + 7);
    }

    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: nextDeadline,
        recurrence: task.recurrence,
        userId: req.userId,
      },
    });
  }

  logger.info(`Task ${taskId} updated by user ${req.userId}`);
  res.json(updatedTask);
};

/* ================= DELETE TASK ================= */
exports.deleteTask = async (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = await prisma.task.findFirst({
    where: { id: taskId, userId: req.userId },
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await prisma.task.delete({ where: { id: taskId } });

  logger.info(`Task ${taskId} deleted by user ${req.userId}`);
  res.json({ message: "Task deleted successfully" });
};

exports.getAllTasksAdmin = async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(tasks);
};
