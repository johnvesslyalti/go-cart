import { useContext, useEffect, useState } from "react"
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/types";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const { token } = useContext(AuthContext) as { token: string};
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await api.get<User[]>('/auth/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <div className="min-h-screen p-10">
            <div onClick={() => navigate("/")} className="absolute flex justify-center items-center cursor-pointer group gap-2 text-lg top-5 left-5"><IoMdArrowRoundBack className="group-hover:text-green-500" /><p className="group-hover:text-green-500">Back</p></div>
                <div className="grid grid-cols-3 gap-5 pt-15">
                    {users.map((user) => (
                        <div className="bg-gray-500 rounded-xl h-[150px] p-5">
                            <h1 className="text-center text-3xl">{user.name.toUpperCase()}</h1>
                            <p className="mt-2">Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                        </div>
                    ))}
                </div>
             </div>
    )
}