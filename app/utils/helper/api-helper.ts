import axios from "axios";
import { Database, DBUserType, TeacherType } from "@/_data/type";

const SERVER_URL = process.env.SERVER_URL;

export async function addUser(newUser: DBUserType): Promise<DBUserType> {
  const { data } = await axios.post<DBUserType>(`${SERVER_URL}/users`, newUser, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
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

export async function updateTeacherData(teacherId: string, updatedData: TeacherType): Promise<TeacherType> {
  const { data } = await axios.put<TeacherType>(`${SERVER_URL}/teachers/${teacherId}`, updatedData, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}
