"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Heading from "@/utils/Heading";
import React, { FC, useState } from "react";

interface PageProps {}

const Page: FC<PageProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="ELearning"
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
      <Hero />
    </div>
  );
};

export default Page;
