const cron = require("node-cron");
const prisma = require("../config/prisma");

cron.schedule("*/1 * * * *", async () => {
  const now = new Date();
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

  const upcomingTasks = await prisma.task.findMany({
    where: {
      status: "PENDING",
      deadline: {
        gte: now,
        lte: inOneHour,
      },
    },
  });

  upcomingTasks.forEach(task => {
    console.log(
      `⏰ Reminder: Task "${task.title}" is due at ${task.deadline}`
    );
  });
});
