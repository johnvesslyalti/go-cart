export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin" | string
}

export interface LoginResponse extends User {
  token: string;
}