import { useDispatch } from "react-redux"
import { signup } from "../../slices/authSlice"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Bounce, toast } from "react-toastify"

export default function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit , formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const submitHandler = (data: any) => {
        toast.success('Signup success!', {
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
            dispatch(signup(data))
            navigate("/")
        }, 2000);
    }
    const allValidators = {
        nameValidator : {
            required : {
                value : true,
                message : "Name is required"
            }
        },
        emailValidator : {
            required : {
                value : true,
                message : "Email is required"
            },
            pattern : {
                value : /^\S+@\S+$/i,
                message : "Invalid email address"
            }
        },
        passwordValidator : {
            required : {
                value : true,
                message : "Password is required"
            },
            minLength : {
                value : 6,
                message : "Password must be at least 6 characters"
            }
        }
    }

    return (
        <div className="flex items-center h-200 w-full justify-center">
            <div className="">
                <form className="bg-gray-100 flex justify-center flex-col p-10 rounded-xl" onSubmit={handleSubmit(submitHandler)}>
                    <input type="text" placeholder="Name" className="border p-1 rounded bg-gray-200"  {...register("name", allValidators.nameValidator)} />
                    {errors.name && <span className="text-red-500 text-sm">{errors?.name?.message}</span>}
                    <br />
                    <input type="email" placeholder="Email" className="border p-1 rounded bg-gray-200"  {...register("email", allValidators.emailValidator)} />
                    {errors.email && <span className="text-red-500 text-sm">{errors?.email?.message}</span>}
                    <br />
                    <input type="password" placeholder="password" className="border p-1 rounded bg-gray-200"  {...register("password", allValidators.passwordValidator)} />
                    {errors.password && <span className="text-red-500 text-sm">{errors?.password?.message}</span>}
                    <br />
                    <button type="submit" value="Submit" className="rounded p-2 bg-green-300 rounded hover:cursor-pointer hover:bg-green-400"
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}
