export interface Author {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatar: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}

// export enum PostType {
//   POST = "POST",
//   NEWS = "NEWS",
//   EVENT = "EVENT",
// }

export type PostType = "POST" | "NEWS" | "EVENT";

export type FeedItem = Post | Event;
export interface Post {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  likesCount: number;
  author: Author;
  createdAt: string;
  updatedAt: string;

  type: "POST" | "NEWS";
}

export interface Event {
  id: string;
  title?: string;
  description: string;
  coverImage?: string;
  likesCount: number;
  author: Author;
  startsAt: string;
  endsAt?: string;
  location: string;
  createdAt: string;
  updatedAt: string;

  type: "EVENT";
}
