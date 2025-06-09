import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"

const Back: React.FC = () => {
    const navigate = useNavigate();
    return(
            <div onClick={() => navigate("/")} className="absolute flex justify-center items-center cursor-pointer group gap-2 text-lg top-5 left-5"><IoMdArrowRoundBack className="group-hover:text-green-500" /><p className="group-hover:text-green-500">Back</p></div>
    )
}

export default Back;