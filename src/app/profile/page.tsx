/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Header from "@/components/Header";
import Profile from "@/components/Profile/Profile";
import Protected from "@/hooks/useProtected";
import Heading from "@/utils/Heading";
import { FC, useState } from "react";
import { useSelector } from "react-redux";

// type ProfileProps = {};
const page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={` ${user && user?.name} Profile`}
          description="Explore a wide range of courses and enhance your knowledge with our e-learning platform."
          keywords="Programming, Web Development, Mobile Development, Machine Learning, Data Science"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default page;
