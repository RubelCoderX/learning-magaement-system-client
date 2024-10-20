/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FC, useEffect, useState } from "react";
import { styles } from "../../app/style/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
// import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("User logged in successfully");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-2">
      <div className="max-w-md w-full p-8 rounded-lg ">
        <h2 className={`text-2xl font-bold text-center ${styles.title}`}>
          Login With Future Academy Learning
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`${styles.label}`} htmlFor="email">
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="loginmail@gmail.com"
              className={`${
                errors.email && touched.email && "border-red-500"
              } w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div className="relative">
            <label className={`${styles.label}`} htmlFor="password">
              Enter Your Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="type your password"
              className={`${
                errors.password && touched.password && "border-red-500"
              } w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
            />
            <span
              className="absolute right-3 top-[42px] cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </span>
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            // onClick={() => signIn("google")}
            className="flex items-center justify-center bg-white text-black px-4 py-2 rounded-lg shadow hover:shadow-lg transition duration-200"
          >
            <FcGoogle size={24} className="mr-2" />
            Sign in with Google
          </button>
          <button
            // onClick={() => signIn("github")}
            className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition duration-200"
          >
            <AiFillGithub size={24} className="mr-2" />
            Sign in with GitHub
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Don’t have an account?
            <span
              onClick={() => setRoute("Signup")}
              className="text-blue-500 ml-2 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
