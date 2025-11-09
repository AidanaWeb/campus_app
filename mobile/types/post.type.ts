export interface Author {
  name: string;
  lastName: string;
  avatar: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}

export interface Post {
  id: number;
  title?: string;
  body: string;
  coverImage?: string;
  likesCount: number;
  createdAt: Date;
  author: Author;

  type: "event" | "post" | "news";
}

interface Event extends Post {
  startsAt: Date;
  endsAt?: Date;
  createdAt: Date;
  place: string;
}
