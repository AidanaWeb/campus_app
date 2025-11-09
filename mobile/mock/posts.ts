import { Post } from "@/types/post.type";

export const posts: Post[] = [
  {
    id: 1,
    title: "Начало нового семестра!",
    body: "С 5 сентября начинается новый учебный семестр. Расписание уже доступно в личных кабинетах студентов.",
    coverImage: undefined,
    likesCount: 42,
    createdAt: new Date("2025-09-01"),
    author: {
      name: "Алия",
      lastName: "Мухамеджанова",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "ADMIN",
    },
  },
  {
    id: 2,
    title: "Объявлен конкурс стартапов",
    body: "Приглашаем студентов принять участие в конкурсе инновационных проектов. Победители получат гранты и менторскую поддержку.",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
    likesCount: 58,
    createdAt: new Date("2025-10-02"),
    author: {
      name: "Данияр",
      lastName: "Тлеулин",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
      role: "TEACHER",
    },
  },
  {
    id: 3,
    title: "День открытых дверей",
    body: "16 ноября пройдет День открытых дверей для абитуриентов. Будут представлены все факультеты и лаборатории.",
    coverImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    likesCount: 33,
    createdAt: new Date("2025-10-28"),
    author: {
      name: "Гульнара",
      lastName: "Сагинтаева",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "ADMIN",
    },
  },
  {
    id: 4,
    title: "Открыта новая лаборатория робототехники",
    body: "Факультет инженерии открыл современную лабораторию робототехники. Приглашаются студенты всех курсов.",
    coverImage: undefined,
    likesCount: 67,
    createdAt: new Date("2025-09-22"),
    author: {
      name: "Ерлан",
      lastName: "Нургалиев",
      avatar: "https://randomuser.me/api/portraits/men/53.jpg",
      role: "TEACHER",
    },
  },
  {
    id: 5,
    title: "Новая столовая открыта в главном корпусе",
    body: "Теперь студенты и преподаватели могут насладиться разнообразным меню и комфортной зоной отдыха.",
    coverImage:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800",
    likesCount: 29,
    createdAt: new Date("2025-10-15"),
    author: {
      name: "Аслан",
      lastName: "Жумабеков",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
      role: "ADMIN",
    },
  },
  {
    id: 6,
    title: "Неделя карьеры 2025",
    body: "В университете пройдет Неделя карьеры. Компании-партнёры проведут мастер-классы и собеседования.",
    coverImage: undefined,
    likesCount: 75,
    createdAt: new Date("2025-11-05"),
    author: {
      name: "Сауле",
      lastName: "Касымова",
      avatar: "https://randomuser.me/api/portraits/women/61.jpg",
      role: "TEACHER",
    },
  },
  {
    id: 7,
    title: "Запуск новой программы по искусственному интеллекту",
    body: "Факультет информационных технологий объявляет набор на программу «AI и машинное обучение».",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    likesCount: 84,
    createdAt: new Date("2025-10-18"),
    author: {
      name: "Андрей",
      lastName: "Ким",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
      role: "TEACHER",
    },
  },
  {
    id: 8,
    title: "Победа на международной олимпиаде",
    body: "Команда факультета математики заняла первое место на олимпиаде по аналитике данных в Сингапуре!",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    likesCount: 95,
    createdAt: new Date("2025-09-30"),
    author: {
      name: "Алина",
      lastName: "Садыкова",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      role: "STUDENT",
    },
  },
  {
    id: 9,
    title: "Открыт приём заявок на Erasmus+",
    body: "Студенты старших курсов могут подать заявки на участие в международной программе обмена Erasmus+ до 20 ноября.",
    coverImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    likesCount: 61,
    createdAt: new Date("2025-10-25"),
    author: {
      name: "Бекзат",
      lastName: "Исабаев",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      role: "ADMIN",
    },
  },
  {
    id: 10,
    title: "Студенческий фестиваль искусств",
    body: "Приглашаем всех на ежегодный фестиваль искусств! Вас ждут музыкальные номера, выставки и ярмарка талантов.",
    coverImage: undefined,
    likesCount: 48,
    createdAt: new Date("2025-11-01"),
    author: {
      name: "Мария",
      lastName: "Кравченко",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      role: "STUDENT",
    },
  },
];
