import { Navigate } from "react-router-dom";
import { User } from "../context/AuthContext";
import { ReactNode } from "react";

interface UserProps {
    children: ReactNode;
    user: User | null;
}

const UserRoute = ({ children, user }: UserProps) => {
    return user?.role === 'user' ? children : <Navigate to="/unauthorized" />;
}

export default UserRoute