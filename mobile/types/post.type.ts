export interface author {
  name: string;
  lastName: string;
  avatar: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}

export interface post {
  id: number;
  title?: string;
  body: string;
  coverImage?: string;
  likesCount: number;
  createdAt: Date;
  author: author;
}
