/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FC, useEffect, useState } from "react";
import { styles } from "../../app/style/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { isSuccess, error, data }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "User registered successfully";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      const res = register(data);
      console.log(res);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-2">
      <div className="max-w-md w-full space-y-8  p-8 rounded-lg shadow-md">
        <h2 className={`text-2xl font-bold text-center ${styles.title}`}>
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`${styles.label}`} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`${
                errors.name && touched.name && "border-red-500"
              } w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
            />
            {errors.name && touched.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>
          <div>
            <label className={`${styles.label}`} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="youremail@example.com"
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
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Your Password"
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
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account ?
            <span
              onClick={() => setRoute("Login")}
              className="text-blue-500 ml-2 cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
