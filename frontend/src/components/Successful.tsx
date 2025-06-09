interface successfulProps {
    message: string;
}
const Successful: React.FC<successfulProps> = ({message}) => {
    return(
        <div className="absolute top-10 bg-green-500 px-2 py-3 animate-bounce">{message}</div>
    )
}

export default Successful;