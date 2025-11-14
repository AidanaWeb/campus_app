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
      description:
        "Этот пост предназначен для знакомства студентов с основами использования платформы. Здесь преподаватели публикуют материалы, задания и рекомендации для дальнейшей работы. Пост регулярно обновляется новыми ссылками и важными замечаниями.",
      type: EntityType.POST,
      coverImage: "https://picsum.photos/seed/lesson1/800/400",
      authorId: getRandomUserIdByRole(allUsers, "TEACHER"),
    },

    {
      title: "Объявление о событии",
      description:
        "Приглашаем всех студентов принять участие в интересном образовательном событии. Вас ждут небольшие практические задания, нетворкинг и возможность задать вопросы преподавателям.",
      type: EntityType.EVENT,
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 3600 * 1000 * 5).toISOString(),
      location: "Аудитория 101",
      coverImage: "https://picsum.photos/seed/event1/800/400",
      authorId: getRandomUserIdByRole(allUsers, "TEACHER"),
    },

    {
      title: "Новости университета",
      description:
        "На этой неделе университет запускает новую программу поддержки студентов первого курса. Также был открыт обновлённый компьютерный класс с современными рабочими станциями и доступом к дополнительным инструментам для разработки.",
      type: EntityType.NEWS,
      coverImage: "https://picsum.photos/seed/news123/800/400",
      authorId: getRandomUserIdByRole(allUsers, "ADMIN"),
    },

    {
      title: "Пост студента о проекте",
      description:
        "Недавно я завершил работу над своим первым полноценным пет-проектом. Это было непросто: пришлось разобраться с авторизацией, оптимизацией запросов и структурированием компонентов. Зато теперь я лучше понимаю, как строить масштабируемые приложения.",
      type: EntityType.POST,
      authorId: getRandomUserIdByRole(allUsers, "STUDENT"),
    },

    {
      title: "Второй учебный пост",
      description:
        "На этом занятии мы перейдём к изучению React Hooks. Вы узнаете, как работают useState, useEffect и пользовательские хуки. Кроме того, будут рассмотрены типичные ошибки и приёмы оптимизации.",
      type: EntityType.POST,
      coverImage: "https://picsum.photos/seed/reactPost/800/400",
      authorId: getRandomUserIdByRole(allUsers, "TEACHER"),
    },

    {
      title: "Важное объявление",
      description:
        "В ближайшие выходные серверная инфраструктура университета будет временно недоступна. Мы проводим техническое обновление, которое повысит производительность и стабильность всех внутренних сервисов.",
      type: EntityType.EVENT,
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 3600 * 1000 * 2).toISOString(),
      location: "Онлайн",
      authorId: getRandomUserIdByRole(allUsers, "ADMIN"),
    },

    {
      title: "Студенческая новость",
      description:
        "На этой неделе студенческий совет провёл встречу, где обсуждались инициативы по улучшению учебного пространства. Среди предложений — установка зарядных станций, расширение зоны отдыха и организация дополнительных кружков.",
      type: EntityType.NEWS,
      coverImage: "https://picsum.photos/seed/studentNews/800/400",
      authorId: getRandomUserIdByRole(allUsers, "STUDENT"),
    },

    {
      title: "Техническая статья",
      description:
        "В этой статье преподаватель делится практическими рекомендациями по работе с NestJS. Будут рассмотрены вопросы структурирования модулей, внедрения зависимостей и правильной обработки ошибок.\n\nТакже в статье вы найдёте советы по оптимизации работы с базами данных через Prisma и примеры распространённых архитектурных подходов для крупных проектов.",
      type: EntityType.POST,
      coverImage: "https://picsum.photos/seed/nestTips/800/400",
      authorId: getRandomUserIdByRole(allUsers, "TEACHER"),
    },

    {
      title: "Личный опыт студента",
      description:
        "Подготовка к хакатону всегда вызывает лёгкое волнение, но опыт, который ты получаешь — бесценен. Я участвовал в хакатоне впервые, и пришлось быстро разбираться в новых технологиях, распределять задачи и корректировать план по ходу дела.\n\nСамым сложным оказалось взаимодействие в команде: разные взгляды, разные темпы, разные подходы. Но именно это и делает хакатоны отличной тренировкой перед реальной разработкой. В итоге мы не заняли призовое место, но получили мощный заряд мотивации.",
      type: EntityType.POST,
      authorId: getRandomUserIdByRole(allUsers, "STUDENT"),
    },

    {
      title: "Новость от администрации",
      description:
        "Администрация университета объявила план развития цифровой платформы на следующий месяц. Среди ключевых целей — улучшение мобильного приложения, добавление новых возможностей для преподавателей и переработка интерфейса расписания.\n\nТакже планируется внедрение единой системы уведомлений, которая позволит студентам быстрее узнавать о новых объявлениях, изменениях в расписании и важных событиях.",
      type: EntityType.NEWS,
      coverImage: "https://picsum.photos/seed/adminNews/800/400",
      authorId: getRandomUserIdByRole(allUsers, "ADMIN"),
    },
  ];

  return postsToCreate;
}
