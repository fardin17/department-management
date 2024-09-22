import axios from "axios";
import { Database, DBUserType, StudentType, TeacherType } from "@/_data/type";

export const SERVER_URL = process.env.SERVER_URL;

export async function addUser(newUser: DBUserType): Promise<DBUserType> {
  const { data } = await axios.post<DBUserType>(`${SERVER_URL}/users`, newUser, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function getUserByEmail(email: string): Promise<DBUserType | undefined> {
  console.log(SERVER_URL)
  return (await axios.get<DBUserType[]>(`http://localhost:4000/users`)).data.find(
    (user) => user.email === email
  );
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
        notes: [],
        subjects: [],
        teachers: [],
      } satisfies StudentType
    }

    else if (type === "teacher") {
      return {
        id: user.id,
        chapter: [],
        department: "",
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

export async function fetchTeacherById(teacherId: string): Promise<TeacherType> {
  const { data } = await axios.get<TeacherType>(`${SERVER_URL}/teachers/${teacherId}`);
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
