export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  lastName: string;
  avatar?: string;
  coverImage?: string;
  email: string;
  bio?: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
