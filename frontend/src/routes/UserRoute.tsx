import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { User } from "@/types/types";

interface UserProps {
    children: ReactNode;
    user: User | null;
}

const UserRoute = ({ children, user }: UserProps) => {
    return user?.role === 'user' ? children : <Navigate to="/unauthorized" />;
}

export default UserRoute