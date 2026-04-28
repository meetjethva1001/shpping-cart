import { useDispatch } from "react-redux"
import { login } from "../../slices/authSlice"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()

    const submitHandler = (data: any) => {
        console.log("click");
        dispatch(login(data))
        alert("signup success.")
        navigate("/login")
    }

    return (
        <div className="flex items-center h-200 w-full justify-center">
            <div className="">
                <form className="bg-gray-100 flex justify-center flex-col p-10 rounded-xl" onSubmit={handleSubmit(submitHandler)}>
                    <input type="text" placeholder="Name" className="border p-1 rounded bg-gray-200" required {...register("name")} /><br />
                    <input type="email" placeholder="Email" className="border p-1 rounded bg-gray-200" required {...register("email")} /><br />
                    <input type="password" placeholder="password" className="border p-1 rounded bg-gray-200" required {...register("password")} /><br />
                    <button type="submit" value="Submit" className="rounded p-2 bg-green-300 rounded hover:cursor-pointer hover:bg-green-400"                     
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}
