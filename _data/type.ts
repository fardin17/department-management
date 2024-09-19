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

export type Teacher = {
    id: string;
    name: string;
    department: string | null;
    chapter: Array<{
        name: string;
    }>;
    notes: Array<{
        department: string;
        note: string;
        date: string;
    }>;
};

export type Student = {
    id: string;
    name: string;
    department: string | null;
};

export type Database = {
    users: DBUserType[];
    students: [];
    teachers: Teacher[]
};