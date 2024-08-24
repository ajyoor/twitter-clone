"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";

const RightbarMenu = () => {
  const year = new Date().getFullYear();
  const [suggested, setSuggested] = useState<any>();

  const getSuggested = async () => {
    try {
      await axios
        .get("https://dummyjson.com/users?limit=5")
        .then((res) => setSuggested(res.data.users));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuggested();
  }, []);
  return (
    <aside className="sticky top-0 h-screen min-h-screen left-0 p-6 pr-8 min-w-80 flex flex-col gap-6">
      <Modal />
      {suggested != undefined && localStorage.getItem("login") ? (
        <div className="flex items-center">
          <Image
            src={suggested[0].image}
            width={38}
            height={38}
            alt="user"
            className="rounded-full"
          />
          <div className="flex flex-col  ml-1">
            <span className="text-sm">
              {suggested[0].firstName} {suggested[0]?.lastName}
            </span>
            <span className="text-xs text-nxGrayLight">Suggested for you</span>
          </div>
          <Link href={"#"} className="text-xs ml-auto text-nxBlue">
            Logout
          </Link>
        </div>
      ) : (
        <Link
          href={"#"}
          className="w-full rounded-xl bg-nxBlue text-center py-2 font-bold"
        >
          Login
        </Link>
      )}
      <div className="flex justify-between w-full">
        <span className="text-sm text-nxGrayLight">Suggested for you</span>
        <span className="text-xs text white">See All</span>
      </div>
      <div className="flex flex-col gap-3 ">
        {suggested != undefined
          ? suggested.map((key: any, index: number) => {
              return (
                <div key={index} className="flex items-center">
                  <Image
                    src={key.image}
                    width={38}
                    height={38}
                    alt="user"
                    className="rounded-full"
                  />
                  <div className="flex flex-col  ml-1">
                    <span className="text-sm">
                      {key.firstName} {key?.lastName}
                    </span>
                    <span className="text-xs text-nxGrayLight">
                      Suggested for you
                    </span>
                  </div>
                  <button className="border border-nxGrayBorder text-xs px-5 py-2 rounded-lg ml-auto">
                    Follow
                  </button>
                </div>
              );
            })
          : "Loading...."}
      </div>
      <div className="flex gap-2">
        <span className="text-nxGrayLight text-xs">@{year} Meta</span>
        <Link href="/" className="text-nxGrayLight text-xs">
          Privacy
        </Link>
        <Link href="/" className="text-nxGrayLight text-xs">
          Terms
        </Link>
        <Link href="/" className="text-nxGrayLight text-xs">
          Cookies policy
        </Link>
      </div>
    </aside>
  );
};

export default RightbarMenu;