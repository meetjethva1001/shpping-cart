
import { useSelector } from "react-redux";

export default function Profile() {
    const { name, email } = useSelector((state: any) => state.auth);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">


                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
                        {name ? name.charAt(0).toUpperCase() : "U"}
                    </div>

                    <h2 className="mt-4 text-xl font-semibold">
                        {name || "User Name"}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        {email || "user@email.com"}
                    </p>
                </div>

   
                <div className="space-y-4 mt-5">

                    <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-medium">{name || "N/A"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium">{email || "N/A"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Password</span>
                        <span className="font-medium">••••••••</span>
                    </div>

                </div>

            </div>
        </div>
    );
}