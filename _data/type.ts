export type DBUserType = {
    id: string
    name: string
    email: string
    image: string | null
    password?: string
    terms: boolean
    type: "teacher" | "student" | "parent" | null
    provider: "google" | "credentials"
}

export type Database = {
    users: DBUserType[]
    students: []
}

