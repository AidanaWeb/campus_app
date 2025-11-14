import { PrismaClient, User } from "../generated/prisma";
import * as bcrypt from "bcrypt";
import { usersToCreate } from "./seeds/users";
import { getMockPosts } from "./seeds/posts";

const prisma = new PrismaClient();

async function main() {
  console.log("Начало заполнения...");

  const createdUsers: User[] = [];

  for (const userData of usersToCreate) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        lastName: userData.lastName,
        password: hashedPassword,
        role: userData.role,
        bio: userData.bio,
        phone: userData.phone,
        avatar: userData.avatar,
        coverImage: userData.coverImage,
      },
      create: {
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
        password: hashedPassword,
        role: userData.role,
        bio: userData.bio,
        phone: userData.phone,
        avatar: userData.avatar,
        coverImage: userData.coverImage,
      },
    });

    createdUsers.push(user);

    console.log(
      `Создан/обновлен пользователь с ID: ${user.id} (${user.email})`,
    );
  }

  const posts = getMockPosts(createdUsers);
  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: post.title,
        description: post.description,
        coverImage: post.coverImage,
        type: post.type,
        startsAt: post.startsAt,
        endsAt: post.endsAt,
        location: post.location,
        authorId: post.authorId,
      },
    });
  }

  console.log("Заполнение завершено.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
