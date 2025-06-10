import { User } from "@/types/types";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminProps {
    children: ReactNode;
    user: User | null;
}
const AdminRoute = ({children, user}: AdminProps) => {
    return user?.role === 'admin' ? children : <Navigate to="/Unauthorized" replace/>;
}

export default AdminRoute;