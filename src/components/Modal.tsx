"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import useZustand from "@/app/store/useZustand";

const Modal = () => {
  const { setShowModal, setAccountUser } = useZustand();
  const [dataLogin, setDataLogin] = useState<any>({});
  const [error, setError] = useState<string>();

  const handleInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataLogin((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmitAuth = async () => {
    try {
      await axios
        .post("https://dummyjson.com/user/login", {
          username: dataLogin.username,
          password: dataLogin.password,
          expiresInMins: 1,
        })
        .then((res) => {
          typeof window !== "undefined" &&
            localStorage.setItem("token", JSON.stringify(res.data));
          setAccountUser(res.data);
        });
      setError("");
      setShowModal();
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div
      className={`flex backdrop-blur-sm justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl rounded-lg border border-nxGrayBorder">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-nxBlack outline-none focus:outline-none">
          <div className="flex items-center justify-between px-5 py-3 h-fit rounded-t">
            <h3 className="text-2xl font-bold">Sign In To Twitter</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={setShowModal}
            >
              <IoClose size={40} className="text-nxBlue" />
            </button>
          </div>
          <div className="relative px-6 flex-auto">
            <form
              className="bg-sgray-200 shadow-md rounded px-8 py-2 flex flex-col gap-5 w-full"
              onSubmit={handleSubmitAuth}
            >
              {error && (
                <span className="w-full text-center m-auto border border-red-700 rounded-xl py-3 bg-red-400 px-8 font-semibold">
                  {error}
                </span>
              )}
              <Input
                type="text"
                withText="Username"
                placeholder="Enter Your Username"
                className="w-80 text-nxGrayDark"
                name="username"
                value={dataLogin?.username ?? ""}
                onChange={handleInput}
              />
              <Input
                withText="Password"
                placeholder="Enter Your Password"
                className="w-80 text-nxGrayDark"
                name="password"
                type="password"
                value={dataLogin?.password ?? ""}
                onChange={handleInput}
              />
            </form>
          </div>
          <Button
            className="text-white bg-nxBlue font-bold uppercase text-sm px-24 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mx-auto my-6 cursor-pointer"
            onClick={handleSubmitAuth}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
