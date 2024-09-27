import axios from "axios";
import { ChapterType, Database, DBUserType, DepartmentType, NotesType, StudentType, SubjectType, TeacherType } from "@/_data/type";

export const SERVER_URL = process.env.SERVER_URL;

export async function addUser(newUser: DBUserType): Promise<DBUserType> {
  const { data } = await axios.post<DBUserType>(`${SERVER_URL}/users`, newUser, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function getUserByEmail(email: string): Promise<DBUserType | undefined> {
  return (await axios.get<DBUserType[]>(`http://localhost:4000/users`)).data.find(
    (user) => user.email === email
  );
}

export async function getTeacherById(id: string): Promise<TeacherType | undefined> {
  const { data } = await axios.get<TeacherType | undefined>(`http://localhost:4000/teachers/${id}`);

  return data;
}

export async function getStudentById(id: string): Promise<StudentType | undefined> {
  const { data } = await axios.get<StudentType | undefined>(`http://localhost:4000/students/${id}`);

  return data;
}

export type ProfileResponseType = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  type: "teacher";
  provider: "google" | "credentials";
  department: DepartmentType['name'] | null;
  chapter: ChapterType[];
  notes: NotesType[];
} | {
  id: string;
  name: string;
  email: string;
  image: string | null;
  type: "student";
  provider: "google" | "credentials";
  subjects: SubjectType[];
  teachers: {
    id: string
    name: string;
    department: string;
  }[];
  notes: NotesType[];
  department: DepartmentType['name'] | null;
}

type GetProfileResponseType = {
  error: "NOT_FOUND" | "NULL_TYPE" | null,
  profile: ProfileResponseType | null
}

export async function fetchProfileByEmail(email: string): Promise<GetProfileResponseType> {
  const user = await getUserByEmail(email)

  if (!user) return { error: "NOT_FOUND", profile: null }
  if (!user.type) return { error: "NULL_TYPE", profile: null }

  if (user.type === "teacher") {
    const teacher = await getTeacherById(user.id);
    if (!teacher) return { error: "NOT_FOUND", profile: null };

    const teacherInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      type: user.type,
      provider: user.provider,
      department: teacher.department,
      chapter: teacher.chapter,
      notes: teacher.notes
    } satisfies ProfileResponseType

    return { error: null, profile: teacherInfo }
  }

  const student = await getStudentById(user.id);
  if (!student) return { error: "NOT_FOUND", profile: null };

  const studentInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    type: user.type,
    provider: user.provider,
    subjects: student.subjects,
    teachers: student.teachers,
    notes: student.notes,
    department: student.department
  } satisfies ProfileResponseType


  return { error: null, profile: studentInfo }
}

export async function updateUserType({ type, email }: { email: string, type: DBUserType['type'] }): Promise<DBUserType | undefined> {

  const user = await getUserByEmail(email)

  // Generates data based on type
  function generateBody() {

    if (!user) return;

    if (type === "student") {
      return {
        id: user.id,
        name: user.name,
        department: null,
        notes: [],
        subjects: [],
        teachers: [],
      } satisfies StudentType
    }

    else if (type === "teacher") {
      return {
        id: user.id,
        chapter: [],
        department: null,
        name: user.name,
        notes: []
      } satisfies TeacherType
    }
  }

  const [res1, res2] = await Promise.all([
    axios.patch<DBUserType>(`http://localhost:4000/users/${user?.id}`, { type }, {
      headers: { "Content-Type": "application/json" },
    }),
    axios.post(`http://localhost:4000/${type === "student" ? "students" : "teachers"}`, generateBody(), {
      headers: { "Content-Type": "application/json" },
    })
  ])

  if (res1 && res2) return res1.data;
}

export async function addTeacher(newTeacher: Partial<TeacherType>): Promise<TeacherType> {
  const { data } = await axios.post<TeacherType>(`${SERVER_URL}/teachers`, newTeacher, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function fetchAllUsers(): Promise<Database["users"]> {
  const { data } = await axios.get<Database["users"]>(`${SERVER_URL}/users`);
  return data;
}

export async function fetchUserById(userId: string): Promise<DBUserType> {
  const { data } = await axios.get<DBUserType>(`${SERVER_URL}/users/${userId}`);
  return data;
}

export async function fetchTeacherById(teacherId: string): Promise<TeacherType & { subject: string | undefined }> {
  const { data } = await axios.get<TeacherType>(`http://localhost:4000/teachers/${teacherId}`);
  const subject = (
    await axios.get<DepartmentType[]>(
      `http://localhost:4000/departments?name=${data.department}`
    )
  ).data[0].subjects.find((item) => item.teacherId === teacherId);

  return { ...data, subject: subject?.name };
}

export async function fetchAllDepartments(): Promise<DepartmentType[]> {
  const { data } = await axios.get<DepartmentType[]>(`http://localhost:4000/departments`);
  return data;
}

export async function fetchDepartment({ department }: { department: DepartmentType["name"] }): Promise<DepartmentType[]> {
  const { data } = await axios.get<DepartmentType[]>(`http://localhost:4000/departments?name=${department}`);
  return data;
}

export async function updateStudentDepartments({ department, id }: { id: string, department: DepartmentType['name'] }) {
  const { data } = await axios.patch(`http://localhost:4000/students/${id}`, { department }, {
    headers: { "Content-Type": "application/json" }
  });
  return data;
}

export async function updateStudentSubjects({ department, id }: { id: string, department: DepartmentType['name'] }): Promise<StudentType> {
  const targetDepartment = await fetchDepartment({ department });

  const subjects = targetDepartment[0].subjects.map(item => ({ ...item }));

  const { data } = await axios.patch<StudentType>(`http://localhost:4000/students/${id}`, { subjects }, {
    headers: { "Content-Type": "application/json" }
  });
  return data;
}

export async function fetchAllStudent(): Promise<StudentType[]> {
  const { data } = await axios.get<StudentType[]>(`http://localhost:4000/students`);
  return data;
}

export async function fetchStudentById(studentId: string): Promise<StudentType> {
  const { data } = await axios.get<StudentType>(`${SERVER_URL}/students/${studentId}`);
  return data;
}

export async function updateTeacherData(teacherId: string, updatedData: TeacherType): Promise<TeacherType> {
  const { data } = await axios.put<TeacherType>(`${SERVER_URL}/teachers/${teacherId}`, updatedData, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}
