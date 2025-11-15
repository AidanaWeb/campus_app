import { UserRole } from "../../generated/prisma";

interface userToCreate {
  name: string;
  lastName: string;
  password: string;
  email: string;
  bio?: string;
  phone?: string;
  role: UserRole;
  facultyId?: number;
  avatar?: string;
  coverImage?: string;
}

export const usersToCreate: userToCreate[] = [
  // STUDENTS
  {
    name: "Aidar",
    lastName: "Saparov",
    password: "password123",
    email: "aidar@mail.com",
    bio: "Люблю React и TypeScript. Сейчас изучаю React Native и backend на NestJS, хочу стать fullstack-разработчиком.",
    phone: "+77010000001",
    role: UserRole.STUDENT,
    facultyId: 1,
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1612197527762-9b2a444ef254?auto=format&fit=crop&w=1200&q=80", // игровые неоновые огни
  },
  {
    name: "Dana",
    lastName: "Nurlybekova",
    password: "password123",
    email: "dana@mail.com",
    bio: "UI/UX дизайнер. Изучаю анимации в Figma и делаю дизайн приложений.",
    role: UserRole.STUDENT,
    facultyId: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1604079628040-94301bb21b1f?auto=format&fit=crop&w=1200&q=80", // минимализм + розовый неон
  },
  {
    name: "Erlan",
    lastName: "Tulegenov",
    password: "password123",
    email: "erlan@mail.com",
    bio: "Backend разработчик на NestJS.",
    phone: "+77010000003",
    role: UserRole.STUDENT,
    facultyId: 3,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    coverImage: "https://unsplash.com/photos/open-book-lot-Oaqk7qqNh_c",
  },
  {
    name: "Amina",
    lastName: "Sadykova",
    password: "password123",
    email: "amina@mail.com",
    bio: "Изучаю машинное обучение, участвую в хакатонах и решаю задачи на Kaggle.",
    role: UserRole.STUDENT,
    facultyId: 4,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Nursultan",
    lastName: "Kairatov",
    password: "password123",
    email: "nursultan@mail.com",
    phone: "+77010000005",
    role: UserRole.STUDENT,
    facultyId: 5,
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    coverImage:
      "https://unsplash.com/photos/do-something-great-neon-sign-oqStl2L5oxI",
  },
  {
    name: "Mira",
    lastName: "Ospanova",
    password: "password123",
    email: "mira@mail.com",
    bio: "Пишу диплом по кибербезопасности.",
    role: UserRole.STUDENT,
    facultyId: 1,
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Dias",
    lastName: "Akhmetov",
    password: "password123",
    email: "dias@mail.com",
    bio: "Люблю C++ и алгоритмы. Участвую в олимпиадах.",
    phone: "+77010000007",
    role: UserRole.STUDENT,
    facultyId: 2,
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Aliya",
    lastName: "Yermekova",
    password: "password123",
    email: "aliya@mail.com",
    bio: "PM в студенческом стартапе.",
    role: UserRole.STUDENT,
    facultyId: 3,
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    coverImage:
      "https://unsplash.com/photos/two-person-standing-on-gray-tile-paving-TamMbr4okv4",
  },
  {
    name: "Rustem",
    lastName: "Bekturov",
    password: "password123",
    email: "rustem@mail.com",
    phone: "+77010000009",
    role: UserRole.STUDENT,
    facultyId: 4,
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Karina",
    lastName: "Serikova",
    password: "password123",
    email: "karina@mail.com",
    bio: "Фанатка UI-дизайна и цифрового искусства.",
    role: UserRole.STUDENT,
    facultyId: 5,
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80",
  },

  // TEACHERS
  {
    name: "Askar",
    lastName: "Temirbayev",
    password: "password123",
    email: "askar.teacher@mail.com",
    bio: "Преподаю основы программирования.",
    phone: "+77020000001",
    role: UserRole.TEACHER,
    facultyId: 1,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Svetlana",
    lastName: "Kuznetsova",
    password: "password123",
    email: "svetlana.teacher@mail.com",
    bio: "Доцент кафедры информационных систем.",
    role: UserRole.TEACHER,
    facultyId: 2,
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    coverImage:
      "https://unsplash.com/photos/person-holding-light-bulb-fIq0tET6llw",
  },
  {
    name: "Marat",
    lastName: "Abdrakhmanov",
    password: "password123",
    email: "marat.teacher@mail.com",
    bio: "Преподаю сетевые технологии.",
    role: UserRole.TEACHER,
    facultyId: 3,
    avatar: "https://randomuser.me/api/portraits/men/80.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Gulnara",
    lastName: "Mukasheva",
    password: "password123",
    email: "gulnara.teacher@mail.com",
    bio: "Кандидат технических наук.",
    role: UserRole.TEACHER,
    facultyId: 4,
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sergey",
    lastName: "Ivanov",
    password: "password123",
    email: "sergey.teacher@mail.com",
    bio: "Специализируюсь на робототехнике.",
    phone: "+77020000005",
    role: UserRole.TEACHER,
    facultyId: 5,
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    coverImage:
      "https://unsplash.com/photos/flock-of-birds-flying-under-blue-sky-during-daytime-Omngyjdzpxk",
  },

  // ADMINS
  {
    name: "Arman",
    lastName: "Bekov",
    password: "password123",
    email: "arman.admin@mail.com",
    bio: "Администратор системы.",
    phone: "+77030000001",
    role: UserRole.ADMIN,
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Laura",
    lastName: "Tulegenova",
    password: "password123",
    email: "laura.admin@mail.com",
    bio: "Главный администратор платформы.",
    phone: "+77030000002",
    role: UserRole.ADMIN,
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80",
  },
];
