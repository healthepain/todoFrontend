

const Login = () => {
    return (
        <>
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white px-16 py-10 flex flex-col rounded-xl shadow-md border-slate-500 ">

                    <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-2xl text-indigo-900">Elon Musk</p>
                        <p>I'm a Programer</p>
                    </div>

                    <button type="button" className="bg-slate-300 text-center rounded-md shadow-md border-gray-600 py-2 px-3 mt-5 font-semibold hover:bg-slate-400 cursor-pointer">Follow</button>
                </div>
            </div>
        </>
    )
}

export default Login
