export default function Message({
    showMessage,
    setShowMessage,
    message,
    func, 
    btn }) {
    return(
        <>
        {showMessage && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gray-500 rounded-xl shadow-lg p-6 w-[300px] space y-4">
                    <h2 className="text-2xl text-center font-bold mb-5">{message}</h2>
                    <div className="flex justify-center items-center mt-5 gap-5">
                        <button onClick={() => setShowMessage(false)} className="bg-green-500 p-2 rounded-lg cursor-pointer">Cancel</button>
                        <button onClick={() => func()} className="bg-red-500 p-2 rounded-lg cursor-pointer">{btn}</button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}