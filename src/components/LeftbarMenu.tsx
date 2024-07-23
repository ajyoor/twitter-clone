import Link from "next/link";
import React from "react";
import { FaHouse } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { TbSquarePlus } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";

const navLink = [
  { id: 1, icon: <FaHouse size={25} />, title: "Home", link: "/" },
  { id: 2, icon: <FiSearch size={25} />, title: "Search", link: "/search" },
  {
    id: 3,
    icon: <TbSquarePlus size={28} />,
    title: "Create",
    link: "/create",
  },
  {
    id: 4,
    icon: <FaRegHeart size={25} />,
    title: "Activity",
    link: "/activity",
  },
  {
    id: 4,
    icon: <FaRegHeart size={25} />,
    title: "",
    link: "/activity",
  },
  { id: 5, icon: <BsThreads size={25} />, title: "", link: "/" },
];
const LeftbarMenu = () => {
  return (
    <aside className="sticky top-0 h-screen min-h-screen left-0 p-6 pr-24 flex flex-col gap-8 border-r border-r-nxGrayBorder">
      <Link
        key={navLink[5]?.id}
        href={navLink[5]?.link}
        className="flex gap-5 items-center mb-3"
      >
        {navLink[5]?.icon}
      </Link>
      {navLink.splice(0, 4).map((key) => {
        return (
          <Link
            key={key.id}
            href={key.link}
            className="flex gap-5 items-center"
          >
            {key.icon}
            {key.title}
          </Link>
        );
      })}
    </aside>
  );
};

export default LeftbarMenu;
