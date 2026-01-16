const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

async function seed() {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
  
    const password = await bcrypt.hash("password123", 10);
  
    const users = [];
  
    for (let i = 1; i <= 5; i++) {
      const user = await prisma.user.create({
        data: {
          email: `seed${i}@test.com`,
          password,
          role: i === 1 ? "ADMIN" : "USER",
        },
      });
      users.push(user);
    }
  
    for (const user of users) {
      for (let j = 1; j <= 10; j++) {
        await prisma.task.create({
          data: {
            title: `Task ${j} for ${user.email}`,
            priority: ["LOW", "MEDIUM", "HIGH"][j % 3],
            deadline: new Date(Date.now() + j * 86400000),
            userId: user.id,
          },
        });
      }
      
    }
  
    console.log("✅ Database seeded successfully");
    process.exit(0);
  }
  