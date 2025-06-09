import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../context/AuthContext";

interface AdminProps {
    children: ReactNode;
    user: User | null;
}
const AdminRoute = ({children, user}: AdminProps) => {
    return user?.role === 'admin' ? children : <Navigate to="/Unauthorized" replace/>;
}

export default AdminRoute;