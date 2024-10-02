"use client";

import { useForm, FieldValues } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import image from "@/src/assets/images/Fish-logo-template-on-transparent-background-PNG.png";
import { useAppDispatch } from "@/src/redux/hooks";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "@/src/lib/verifyToken";
import { IUserJwtPayload, TUserRole } from "@/src/types";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: any) => {
    // Display loading toast
    const toastId = toast.loading("Logging in...");
    console.log(data);

    try {
      const res = await login(data).unwrap();
      console.log(res);

      if (res.statusCode === 200) {
        const verifiedUser = verifyToken(res.token) as IUserJwtPayload;

        if (verifiedUser) {
          dispatch(setUser({ user: res.data, token: res.token }));

          toast.success("Login successful!", {
            id: toastId,
            duration: 2000,
            className: "text-green-500",
          });

          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      }
    } catch (loginError: any) {
      if (loginError?.status === 400 && loginError?.data) {
        toast.error(`Login Failed: ${loginError?.data?.message}`, {
          id: toastId,
          duration: 4000,
          className: "text-red-700",
        });
      } else {
        toast.error(`${loginError?.data?.message}`, {
          id: toastId,
          duration: 2000,
          className: "bg-red-700 text-white",
        });
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <Link className="flex items-center justify-center mb-6" href="/">
            <Image
              alt="logo"
              className="w-12 h-12"
              height={40}
              src={image}
              width={40}
            />
            <p className="font-normal font-raleway text-4xl text-[#FF7F50] tracking-tighter">
              <span className="italic font-semibold">fish</span>Cove
            </p>
          </Link>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-black/60 text-center text-2xl font-semibold uppercase tracking-tighter">
              Sign in
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="text-gray-600 text-sm font-semibold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full text-gray-800 text-sm border-b border-gray-300 px-4 py-1.5 rounded-none outline-gray-300"
                  placeholder="Enter email"
                />
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="text-gray-600 text-sm font-semibold"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full text-gray-800 text-sm border-b border-gray-300 px-4 py-1.5 rounded-none outline-gray-300"
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute right-4 text-gray-600"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    className="h-3 w-3 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />
                  <label
                    className="ml-1 block text-xs text-gray-800"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/forgot-password">
                    <p className="text-[#FF7F50] hover:underline text-xs">
                      Forgot your password?
                    </p>
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="w-full py-2 px-4 tracking-tight rounded-sm text-white font-normal text-base bg-[#33B7FF] hover:bg-blue-400 focus:outline-none"
                  type="submit"
                >
                  Sign In
                </button>
              </div>

              <p className="text-gray-800 text-xs mt-8 text-center">
                Don&lsquo;t have an account?
                <Link href="/register">
                  <span className="text-[#FF7F50] hover:underline ml-1 whitespace-nowrap font-semibold">
                    Register here
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
