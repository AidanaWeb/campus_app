import { EntityType, User } from "../../generated/prisma";

interface postToCreate {
  title: string;
  description: string;
  coverImage?: string;
  type: EntityType;
  startsAt?: string;
  endsAt?: string;
  location?: string;
  authorId: string;
}

function getRandomUserIdByRole(users: User[], role: string) {
  const filtered = users.filter((u) => u.role === role);
  return filtered[Math.floor(Math.random() * filtered.length)].id;
}

export function getMockPosts(allUsers: User[]) {
  const postsToCreate: postToCreate[] = [
    {
      title: "Первый учебный пост",
      description: "Описание первого учебного поста.",
      type: EntityType.POST,
      authorId: getRandomUserIdByRole(allUsers, "TEACHER"),
    },
    {
      title: "Объявление о событии",
      description: "Интересное событие для студентов.",
      type: EntityType.EVENT,
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 3600 * 1000 * 5).toISOString(),
      location: "Аудитория 101",
      authorId: getRandomUserIdByRole(allUsers, "TEACHER"),
    },
    {
      title: "Новости университета",
      description: "Актуальные новости университета на этой неделе.",
      type: EntityType.NEWS,
      authorId: getRandomUserIdByRole(allUsers, "ADMIN"),
    },
    {
      title: "Пост студента о проекте",
      description: "Студент делится опытом работы над проектом.",
      type: EntityType.POST,
      authorId: getRandomUserIdByRole(allUsers, "STUDENT"),
    },
    {
      title: "Второй учебный пост",
      description: "Материалы к семинару по React.",
      type: EntityType.POST,
      authorId: getRandomUserIdByRole(allUsers, "TEACHER"),
    },
    {
      title: "Важное объявление",
      description: "Администратор сообщает важную информацию.",
      type: EntityType.EVENT,
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 3600 * 1000 * 2).toISOString(),
      location: "Онлайн",
      authorId: getRandomUserIdByRole(allUsers, "ADMIN"),
    },
    {
      title: "Студенческая новость",
      description: "Новость от студента о студенческом событии.",
      type: EntityType.NEWS,
      authorId: getRandomUserIdByRole(allUsers, "STUDENT"),
    },
    {
      title: "Техническая статья",
      description: "Учитель делится советами по NestJS.",
      type: EntityType.POST,
      authorId: getRandomUserIdByRole(allUsers, "TEACHER"),
    },
    {
      title: "Личный опыт студента",
      description: "Как я готовился к хакатону.",
      type: EntityType.POST,
      authorId: getRandomUserIdByRole(allUsers, "STUDENT"),
    },
    {
      title: "Новость от администрации",
      description: "План развития платформы на месяц.",
      type: EntityType.NEWS,
      authorId: getRandomUserIdByRole(allUsers, "ADMIN"),
    },
  ];

  return postsToCreate;
}
