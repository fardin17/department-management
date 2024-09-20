export type DBUserType = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  password?: string;
  terms: boolean;
  type: "teacher" | "student" | "parent" | null;
  provider: "google" | "credentials";
};

export type ChapterType = {
  name: string;
  description: string;
};

export type NotesType = {
  name: string;
  description: string;
};

export type TeacherType = {
  id: string;
  name: string;
  department: string;
  chapter: ChapterType[];
  notes: NotesType[];
};

export type Database = {
  users: DBUserType[];
  students: [];
  teachers: TeacherType[];
};

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
};
