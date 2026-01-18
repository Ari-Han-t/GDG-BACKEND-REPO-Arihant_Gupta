const prisma = require("../config/prisma");
const logger = require("../utils/logger");

exports.getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  res.json(user);
};

exports.updateMe = async (req, res) => {
  const { email } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: req.userId },
    data: {
      email,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  logger.info(`User ${req.userId} updated profile`);

  res.json(updatedUser);
};
