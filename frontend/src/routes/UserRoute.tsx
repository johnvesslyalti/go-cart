import { Navigate } from "react-router-dom";

export default function UserRoute({ children, user }) {
    return user?.role === 'user' ? children : Navigate("/unauthorized");
}