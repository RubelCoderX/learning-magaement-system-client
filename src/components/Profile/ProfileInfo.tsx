/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { FaCameraRotate } from "react-icons/fa6";
import avaterImg from "../../assets/image.png";
import { FC, useEffect, useState } from "react";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

type ProfileInfoProps = {
  avatar: string | null;
  user: any;
};
const ProfileInfo: FC<ProfileInfoProps> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: editError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar({
          avatar,
        });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || editError) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile Updated Successfully");
    }
  }, [isSuccess, error, success, editError]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({ name: name, email: user.email });
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-lg p-8">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avaterImg}
            alt="Profile"
            width={128}
            height={128}
            className="rounded-full border-2 border-gray-600"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpeg,image/webp"
          />

          <label htmlFor="avatar">
            <div className="absolute bottom-0 right-0 p-1 bg-gray-800 rounded-full">
              <FaCameraRotate className="w-6 cursor-pointer h-6 text-gray-400" />
            </div>
          </label>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-black dark:text-[#fff] mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black dark:text-[#fff] mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={user?.email}
              required
              name="email"
              placeholder="programmershahriarsojeeb@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full border-t-2 border-t-[#37a39a] px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
