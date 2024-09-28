"use client";

import React from "react";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import SkeletonPost from "@/components/SkeletonPost";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const PostsPage = () => {
  const { data: postsData, error: postsError } = useSWR("https://dummyjson.com/posts", fetcher);

  const { data: usersData, error: usersError } = useSWR(
    postsData ? `/users?ids=${postsData.posts.map((post: any) => post.userId).join(",")}` : null,
    async (url) => {
      const usersPromises = postsData.posts.map((post: any) =>
        axios.get(`https://dummyjson.com/users/${post.userId}`).then(res => res.data)
      );
      return Promise.all(usersPromises);
    }
  );

  if (postsError || usersError) return <div>Failed to load data</div>;
  if (!postsData || !usersData) return Array(20).fill(<SkeletonPost></SkeletonPost>);

  return (
    <div className="px-10 w-full md:px-4">
      {postsData.posts.map((post: any, index: number) => {
        const selectedUser = usersData.find((user: any) => user.id === post.userId);
        return (
          <Link
            key={index}
            className="flex flex-row gap-3 py-3 border-b border-nxGrayBorder hover:bg-nxGrayDark"
            href={`posts/${selectedUser.id}`}
          >
            <Image
              src={selectedUser.image}
              width="30"
              height="10"
              alt="user"
              className="rounded-full border border-white md:hidden"
            />
            <div className="flex flex-col gap-1">
              <span className="font-bold md:flex md:items-center md:gap-3">
                <Image
                  src={selectedUser.image}
                  width="30"
                  height="10"
                  alt="user"
                  className="rounded-full border border-white hidden md:block"
                />
                {selectedUser.firstName} {selectedUser.lastName}{" "}
                <span className="text-nxGrayLight text-xs pl-1">
                  {selectedUser.username}
                </span>
              </span>
              <span className="text-sm text-justify">{post.body}</span>
              <div className="flex gap-2 items-center text-xs text-nxGrayLight">
                <span className="text-sm text-justify">
                  {post.reactions.likes} likes
                </span>
                <div className="rounded-full w-1 h-1 bg-nxGrayLight"></div>
                <span className="text-sm text-justify">
                  {post.reactions.dislikes} dislikes
                </span>
                <div className="rounded-full w-1 h-1 bg-nxGrayLight"></div>
                <span className="text-sm text-justify">{post.views} view</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostsPage;
