"use client";

import Link from "next/link";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { TbSquarePlus } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import Image from "next/image";
import useZustand from "../store/useZustand";

const navLink = [
  { id: 1, icon: <BsThreads size={25} />, title: "", link: "#" },
  { id: 2, icon: <AiOutlineHome size={25} />, title: "Home", link: "/posts" },
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

const LeftMenu = () => {
  const { accountUser, setShowModal } = useZustand();

  return (
    <aside className="sticky top-0 h-screen min-h-screen left-0 p-6 pr-24 flex flex-col gap-8 border-r border-r-nxGrayBorder md:pr-5">
      {navLink.map((key) => {
        return (
          <Link
            key={key.id}
            href={key.link ?? ""}
            className={`flex gap-5 items-center md:mx-auto ${
              key.id == 1 && "mb-3"
            }`}
          >
            {key.icon}
            <span className="md:hidden">{key.title}</span>
          </Link>
        );
      })}

      {Object.keys(accountUser).length ? (
        <Link href="/profile" className="hidden md:flex items-center">
          <Image
            src={accountUser.image}
            width={30}
            height={30}
            alt="user"
            className="rounded-full border border-white"
          />
        </Link>
      ) : (
        <div className="cursor-pointer" onClick={setShowModal}>
          <SlLogin size={23} />
        </div>
      )}
    </aside>
  );
};

export default LeftMenu;
