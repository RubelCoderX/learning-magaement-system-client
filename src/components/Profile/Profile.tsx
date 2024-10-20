/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "../ChangePassword/ChangePassword";
// import { useLogOutQuery } from "../../redux/features/auth/authApi";
// import { signOut } from "next-auth/react";

type ProfileProps = {
  user: any;
};

const Profile: FC<ProfileProps> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  // const [logout, setLogout] = useState(false);
  // const {} = useLogOutQuery(undefined, {
  //   skip: !logout ? true : false,
  // });
  const [logOut] = useLogOutMutation({});

  const logOutHandler = async () => {
    await logOut({}).unwrap();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#1ffffff1d] border-[#0000001c]  rounded-[5px] shadow-md dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
    </div>
  );
};

export default Profile;
