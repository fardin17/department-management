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
  mark: number;
  teacherId: string
};

export type NotesType = {
  title: string,
  note: string;
  subject: string,
  //? DD/MM/YYYY
  date: `${number}-${number}-${number}`,
  //? HH:MM(PM/AM)
  time: `${number}:${number}${"AM" | "PM"}`
};

export type TeacherType = {
  id: string;
  name: string;
  department: DepartmentType['name'] | null;
  chapter: ChapterType[];
  notes: NotesType[];
};

export type StudentType = {
  id: string;
  name: string;
  department: DepartmentType['name'] | null;
  teachers: {
    id: string
    name: string;
    department: string;
  }[];
  subjects: SubjectType[];
  notes: NotesType[];
};

export type DepartmentType = {
  id: string;
  name: "Mechanical" | "Electrical" | "Computer Science";
  subjects: SubjectType[];
};

export type Database = {
  users: DBUserType[];
  students: StudentType[];
  teachers: TeacherType[];
  departments: DepartmentType[]
};

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
};


// {
//   id: "dept1",
//     name: "Mechanical",
//       subjects: [
//         "Fluid Mechanics",
//         "Machine Design",
//         "Heat Transfer",
//         "Manufacturing Processes",
//         "Engineering Mechanics"
//       ]
// },
// {
//   id: "dept2",
//     name: "Electrical",
//       subjects: [
//         "Circuit Theory",
//         "Power Systems",
//         "Electrical Machines",
//         "Digital Electronics",
//         "Signal Processing"
//       ]
// },
// {
//   id: "dept4",
//     name: "Computer Science",
//       subjects: [
//         "Data Structures and Algorithms",
//         "Database Management Systems",
//         "Computer Networks",
//         "Software Engineering",
//         "Artificial Intelligence"
//       ]
// }

// { name: "Alice Johnson", email: "alice.johnson@example.com" },
// { name: "Bob Williams", email: "bob.williams@example.com" },
// { name: "Charlie Brown", email: "charlie.brown@example.com" },
// { name: "David Smith", email: "david.smith@example.com" },
// { name: "Eve Thompson", email: "eve.thompson@example.com" },
// { name: "Frank Miller", email: "frank.miller@example.com" },
// { name: "Grace Clark", email: "grace.clark@example.com" },
// { name: "Henry Wilson", email: "henry.wilson@example.com" },
// { name: "Isla Martinez", email: "isla.martinez@example.com" },
// { name: "Jack Davis", email: "jack.davis@example.com" },
// { name: "Kathy Moore", email: "kathy.moore@example.com" },
// { name: "Liam Anderson", email: "liam.anderson@example.com" },
// { name: "Mia Lewis", email: "mia.lewis@example.com" },
// { name: "Noah Walker", email: "noah.walker@example.com" },
// { name: "Olivia Young", email: "olivia.young@example.com" }