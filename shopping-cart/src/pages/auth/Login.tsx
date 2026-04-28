import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../slices/authSlice"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const userData = localStorage.getItem("credentials");
    const jsonData = JSON.parse(userData);
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const submitHandler = (data: any) => {
        console.log(jsonData);
        if (jsonData === null) {
        return alert("Signup first!!")
    }
    if (data.email === jsonData.email && data.password === jsonData.password) {
        dispatch(login(data))
        alert("Login success!!")
        navigate("/")
    }
    else if (data.email === "" || data.password === "") return alert("Fields required!")
    else {
        alert("Invalid email or password");
    }
}
return (
    <div className="flex items-center h-200 w-full justify-center">
        <div className="">
            <form className="bg-gray-100 flex justify-center flex-col p-10 rounded-xl" onSubmit={handleSubmit(submitHandler)}>
                <input type="text" placeholder="Email" className="border p-1 rounded bg-gray-200" required {...register("email")} /><br />
                <input type="password" placeholder="password" className="border p-1 rounded bg-gray-200" required {...register("password")} /><br />
                <input type="submit" value="Submit" className="rounded p-2 bg-green-300 rounded hover:cursor-pointer hover:bg-green-400" />
            </form>
        </div>
    </div>
)
}
