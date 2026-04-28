export default function Login() {
    return (
        <div className="flex items-center h-200 w-full justify-center">
            <div className="">
                <form className="bg-gray-100 flex justify-center flex-col p-10 rounded-xl">
                    <input type="text" placeholder="Email" className="border p-1 rounded bg-gray-200" required /><br />
                    <input type="password" placeholder="password" className="border p-1 rounded bg-gray-200" required /><br />
                    <input type="submit" value="Submit" className="rounded p-2 bg-green-300 rounded hover:cursor-pointer hover:bg-green-400" />
                </form>
            </div>
        </div>
    )
}
