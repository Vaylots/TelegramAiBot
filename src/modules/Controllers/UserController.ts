import { PrismaClient } from "@prisma/client";
export class UserController {
  private prisma;
  constructor() {
     this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    await this.prisma.$connect();
    const users = await this.prisma.users.findMany();
    return users;
    
  }

  async findUserById(userId: number) {
    await this.prisma.$connect();
    const user = this.prisma.users.findFirst({
      where: {
        userId: userId,
      },
    });

    return user;
  }

  async addUser(username: string | undefined, userId: number) {
    await this.prisma.$connect();
    const user = await this.findUserById(userId);
    if (user == null) {
      await this.prisma.users.create({
        data: {
          username: username,
          userId: userId,
        },
      });
    } else {
      await this.prisma.$disconnect();
      return;
    }

    await this.prisma.$disconnect();
  }
}
