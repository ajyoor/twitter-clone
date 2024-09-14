"use client";

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import SkeletonPost from "@/components/SkeletonPost";

const PostsPage = () => {
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
    <div className="px-10 w-full md:px-4">
      {posts
        ? posts?.map((key: any, index: number) => {
            const selectedUsers = userPosts.find(
              (el: any) => el.id == key.userId
            );
            return (
              <Link
                key={index}
                className="flex flex-row gap-3 py-3 border-b border-nxGrayBorder hover:bg-nxGrayDark"
                href={`posts/${selectedUsers.id}`}
              >
                <Image
                  src={selectedUsers.image}
                  width="30"
                  height="10"
                  alt="user"
                  className="rounded-full border border-white md:hidden"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-bold md:flex md:items-center md:gap-3">
                    <Image
                      src={selectedUsers.image}
                      width="30"
                      height="10"
                      alt="user"
                      className="rounded-full border border-white hidden md:block"
                    />
                    {selectedUsers.firstName} {selectedUsers.lastName}{" "}
                    <span className="text-nxGrayLight text-xs pl-1">
                      {selectedUsers.username}
                    </span>
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
                    <span className="text-sm text-justify">
                      {key.views} view
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        : Array(20).fill(<SkeletonPost></SkeletonPost>)}
    </div>
  );
};

export default PostsPage;
