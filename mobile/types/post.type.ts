export interface Author {
  name: string;
  lastName: string;
  avatar: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}

export type FeedItem = Post | Event;
export interface Post {
  id: number;
  title?: string;
  body: string;
  coverImage?: string;
  likesCount: number;
  createdAt: Date;
  author: Author;
  description?: string;

  type: "post" | "news";
}

export interface Event {
  id: number;
  title?: string;
  body: string;
  coverImage?: string;
  likesCount: number;
  createdAt: Date;
  author: Author;
  description?: string;

  startsAt: Date;
  endsAt?: Date;
  location: string;
  type: "event";
}
