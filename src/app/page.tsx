"use client";

import { useState, useEffect } from "react";
import LeftbarMenu from "@/components/LeftbarMenu";
import RightbarMenu from "@/components/RightbarMenu";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [posts, setPosts] = useState<any>();
  const [userPosts, setUserPosts] = useState<any>();

  const getAllPosts = async () => {
    try {
      const data = await axios.get("https://dummyjson.com/posts");
      const userPromises = data.data.posts.map(async (post: any) => {
        const userResponse = await axios.get(
          `https://dummyjson.com/users/${post.userId}`
        );
        return userResponse.data;
      });
      const users = await Promise.all(userPromises);

      setUserPosts(users);
      setPosts(data.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <main className="relative flex">
      <LeftbarMenu />
      <div className="px-10">
        {posts?.map((key: any, index: number) => {
          const selectedUsers = userPosts.find(
            (el: any) => el.id == key.userId
          );
          return (
            <div
              key={index}
              className="flex flex-row gap-3 py-3 border-b border-nxGrayBorder"
            >
              
              <Image
                src={selectedUsers.image}
                width={38}
                height={38}
                alt="user"
                className="rounded-full"
              />
              <div className="flex flex-col gap-1">
                <span className="font-bold">
                  {selectedUsers.firstName} {selectedUsers.lastName}
                </span>
                <span className="text-sm text-justify">{key.body}</span>
                <div className="flex gap-2 items-center text-xs text-nxGrayLight">
                  <span className="text-sm text-justify">
                    {key.reactions.likes} likes
                  </span>
                  <div className="rounded-full w-1 h-1 bg-nxGrayLight"></div>
                  <span className="text-sm text-justify">
                    {key.reactions.dislikes} dislikes
                  </span>
                  <div className="rounded-full w-1 h-1 bg-nxGrayLight"></div>
                  <span className="text-sm text-justify">{key.views} view</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <RightbarMenu />
    </main>
  );
}

// [
//   {
//     id: 1,
//     title: "His mother had always taught him",
//     body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
//     tags: ["history", "american", "crime"],
//     reactions: {
//       likes: 192,
//       dislikes: 25,
//     },
//     views: 305,
//     userId: 121,
//   },
// ]

// {
//     "id": 177,
//     "firstName": "Xavier",
//     "lastName": "Wright",
//     "maidenName": "",
//     "age": 37,
//     "gender": "male",
//     "email": "xavier.wright@x.dummyjson.com",
//     "phone": "+91 561-239-9006",
//     "username": "xavierw",
//     "password": "xavierwpass",
//     "birthDate": "1987-1-11",
//     "image": "https://dummyjson.com/icon/xavierw/128",
//     "bloodGroup": "AB+",
//     "height": 192.26,
//     "weight": 85.15,
//     "eyeColor": "Violet",
//     "hair": {
//         "color": "Green",
//         "type": "Straight"
//     },
//     "ip": "191.157.149.183",
//     "address": {
//         "address": "1497 Eighth Street",
//         "city": "Jacksonville",
//         "state": "Maryland",
//         "stateCode": "MD",
//         "postalCode": "37262",
//         "coordinates": {
//             "lat": -82.732098,
//             "lng": -118.759483
//         },
//         "country": "United States"
//     },
//     "macAddress": "b6:25:29:40:c0:e3",
//     "university": "Carnegie Mellon University",
//     "bank": {
//         "cardExpire": "03/27",
//         "cardNumber": "4449074075966103",
//         "cardType": "RuPay International",
//         "currency": "CNY",
//         "iban": "D6J2JIZAEEZJJ68IZRULK80M"
//     },
//     "company": {
//         "department": "Human Resources",
//         "name": "Kling Inc",
//         "title": "Marketing Manager",
//         "address": {
//             "address": "1643 Madison Street",
//             "city": "Chicago",
//             "state": "West Virginia",
//             "stateCode": "WV",
//             "postalCode": "24314",
//             "coordinates": {
//                 "lat": 6.085107,
//                 "lng": -113.724523
//             },
//             "country": "United States"
//         }
//     },
//     "ein": "480-899",
//     "ssn": "571-857-220",
//     "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
//     "crypto": {
//         "coin": "Bitcoin",
//         "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
//         "network": "Ethereum (ERC20)"
//     },
//     "role": "user"
// }
