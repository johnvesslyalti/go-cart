import { Navigate } from "react-router-dom";

export default function AdminRoute({children, user}) {
    return user?.role === 'admin' ? children : <Navigate to="/Unauthorized" replace/>;
}