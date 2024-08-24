import Link from "next/link";
import React from "react";
import { FaHouse } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { TbSquarePlus } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";

const navLink = [
  { id: 1, icon: <BsThreads size={25} />, title: "", link: "#" },
  { id: 2, icon: <FaHouse size={25} />, title: "Home", link: "#" },
  { id: 3, icon: <FiSearch size={25} />, title: "Search", link: "#" },
  {
    id: 4,
    icon: <TbSquarePlus size={28} />,
    title: "Create",
    link: "#",
  },
  {
    id: 5,
    icon: <FaRegHeart size={25} />,
    title: "Activity",
    link: "#",
  },
];
const LeftbarMenu = () => {
  return (
    <aside className="sticky top-0 h-screen min-h-screen left-0 p-6 pr-24 flex flex-col gap-8 border-r border-r-nxGrayBorder">
      {navLink.map((key) => {
        return (
          <Link
            key={key.id}
            href={key.link ?? ""}
            className={`flex gap-5 items-center ${key.id == 1 && "mb-3"}`}
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
