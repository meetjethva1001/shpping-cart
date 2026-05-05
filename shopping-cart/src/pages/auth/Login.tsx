import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login } from "../../slices/authSlice"
import { useNavigate } from "react-router-dom"
import { Bounce, toast } from "react-toastify";

export default function Login() {
    const userData = localStorage.getItem("credentials") ? localStorage.getItem("credentials") : null;
    const jsonData = JSON.parse(userData);
    const navigate = useNavigate()
    const { register, handleSubmit , formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const submitHandler = (data: any) => {

        if (jsonData === null) {
            return toast.warning('Please signup first!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        if (data.email === jsonData.email && data.password === jsonData.password) {
            toast.success('Login success!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setTimeout(() => {
                dispatch(login(data))
                navigate("/")
            }, 2000);
        }
        else if (data.email === "" || data.password === "") return alert("Fields required!")
        else {
            toast.error('Invalid email or password!!!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }
    const allValidators = {
        emailValidator : {
            required : {
                value : true,
                message : "Email is required"
            }
        },
        passwordValidator : {
            required : {
                value : true,
                message : "Password is required"
            }
        }
    }
    console.log(errors);
    return (
        <div className="flex items-center h-200 w-full justify-center">
            <div className="">
                <form className="bg-gray-100 flex justify-center flex-col p-10 rounded-xl" onSubmit={handleSubmit(submitHandler)}>
                    <input type="text" placeholder="Email" className="border p-1 rounded bg-gray-200"  {...register("email", allValidators.emailValidator)} />
                    {errors.email && <span className="text-red-500 text-sm">{errors?.email?.message}</span>}
                    <br />
                    <input type="password" placeholder="password" className="border p-1 rounded bg-gray-200"  {...register("password", allValidators.passwordValidator)} />
                    {errors.password && <span className="text-red-500 text-sm">{errors?.password?.message}</span>}
                    <br />
                    <input type="submit" value="Submit" className="rounded p-2 bg-green-300 rounded hover:cursor-pointer hover:bg-green-400" />
                </form>
            </div>
        </div>
    )
}
