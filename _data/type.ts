export type DBUserType = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  password?: string;
  terms: boolean;
  type: "teacher" | "student" | null;
  provider: "google" | "credentials";
};

export type ChapterType = {
  id: string;
  title: string;
  lessons: string[];
  duration: string;
  lessonCount: number;
};

export type SubjectType = {
  id: number;
  name: string;
  description: string;
  mark: number;
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

export type StudentType = {
  id: string;
  name: string;
  teachers: {
    name: string;
    department: string;
  }[];
  subjects: SubjectType[];
  notes: NotesType[];
};

export type Database = {
  users: DBUserType[];
  students: StudentType[];
  teachers: TeacherType[];
};

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
};
