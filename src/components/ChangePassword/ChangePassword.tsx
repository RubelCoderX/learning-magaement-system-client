/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const passwordChangedHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="flex flex-col items-center justify-center w-full  px-4 py-8 ">
      <div className="w-full max-w-md p-6  rounded-lg shadow-md text-black dark:text-[#fff]">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Change Password
        </h1>
        <form onSubmit={passwordChangedHandler} className="space-y-4">
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-black dark:text-[#fff] mb-2"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="Enter your old password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-black dark:text-[#fff] mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-black dark:text-[#fff] mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full border-t-2 border-t-[#37a39a] px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
