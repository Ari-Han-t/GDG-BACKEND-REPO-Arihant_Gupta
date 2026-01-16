const { z } = require("zod");

exports.createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  deadline: z.string(),
  recurrence: z.enum(["DAILY", "WEEKLY"]).optional(),
});
