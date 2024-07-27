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
          ? suggested.map((key: any) => {
              return (
                <div className="flex items-center">
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
// {
//     "id": 1,
//     "firstName": "Emily",
//     "lastName": "Johnson",
//     "maidenName": "Smith",
//     "age": 28,
//     "gender": "female",
//     "email": "emily.johnson@x.dummyjson.com",
//     "phone": "+81 965-431-3024",
//     "username": "emilys",
//     "password": "emilyspass",
//     "birthDate": "1996-5-30",
//     "image": "https://dummyjson.com/icon/emilys/128",
//     "bloodGroup": "O-",
//     "height": 193.24,
//     "weight": 63.16,
//     "eyeColor": "Green",
//     "hair": {
//         "color": "Brown",
//         "type": "Curly"
//     },
//     "ip": "42.48.100.32",
//     "address": {
//         "address": "626 Main Street",
//         "city": "Phoenix",
//         "state": "Mississippi",
//         "stateCode": "MS",
//         "postalCode": "29112",
//         "coordinates": {
//             "lat": -77.16213,
//             "lng": -92.084824
//         },
//         "country": "United States"
//     },
//     "macAddress": "47:fa:41:18:ec:eb",
//     "university": "University of Wisconsin--Madison",
//     "bank": {
//         "cardExpire": "03/26",
//         "cardNumber": "9289760655481815",
//         "cardType": "Elo",
//         "currency": "CNY",
//         "iban": "YPUXISOBI7TTHPK2BR3HAIXL"
//     },
//     "company": {
//         "department": "Engineering",
//         "name": "Dooley, Kozey and Cronin",
//         "title": "Sales Manager",
//         "address": {
//             "address": "263 Tenth Street",
//             "city": "San Francisco",
//             "state": "Wisconsin",
//             "stateCode": "WI",
//             "postalCode": "37657",
//             "coordinates": {
//                 "lat": 71.814525,
//                 "lng": -161.150263
//             },
//             "country": "United States"
//         }
//     },
//     "ein": "977-175",
//     "ssn": "900-590-289",
//     "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
//     "crypto": {
//         "coin": "Bitcoin",
//         "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
//         "network": "Ethereum (ERC20)"
//     },
//     "role": "admin"
// }
