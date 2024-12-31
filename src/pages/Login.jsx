
import LoginUser from "@/components/User/LoginUser";
import RegisterUser from "@/components/User/RegisterUser";
import { useState } from "react";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <section>
                <div className="container flex flex-col gap-5 p-4 mx-auto my-10 md:flex-row">
                    <div className="items-center justify-center flex-1 hidden sm:block">
                        <div className="flex items-center justify-center w-full h-64 bg-gray-20">
                            <span className="text-gray-500">Image Placeholder</span>
                        </div>
                    </div>
                    {
                        isLogin ?
                            <LoginUser state={setIsLogin} />
                            :
                            < RegisterUser state={setIsLogin} />
                    }
                </div>
            </section>

        </>
    )
}

export default Login