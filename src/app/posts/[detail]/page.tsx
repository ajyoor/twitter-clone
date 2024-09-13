"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SkeletonPost from "@/components/SkeletonPost";
import { AiFillLike, AiFillDislike, AiOutlineComment } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";

const DetailPostsPage = () => {
  const postsId = useParams().detail;
  const [post, setPost] = useState<any>({});
  const [allPost, setAllPost] = useState<any>();

  const getSinglePosts = async () => {
    try {
      const data = await axios.get(`https://dummyjson.com/posts/${postsId}`);
      return setPost(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentPosts = async () => {
    try {
      const data = await axios.get(
        `https://dummyjson.com/posts/${postsId}/comments`
      );
      return setPost((prevPost: any) => ({
        ...prevPost,
        comments: data.data.comments,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPostsByUsers = async () => {
    try {
      const data = await axios.get(
        `https://dummyjson.com/posts/user/${postsId}`
      );
      return setAllPost(data.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePosts();
    getCommentPosts();
    getAllPostsByUsers();
  }, []);

  return (
    <>
      {(post != undefined && allPost != undefined) || post.comments ? (
        <div className="flex flex-col gap-3 p-3 border-b border-nxGrayBorder">
          <Link href="/posts">
            <IoArrowBackOutline size={42} />
          </Link>
          <div className="flex flex-col gap-1 border rounded-md border-nxGrayBorder p-2">
            <span className="text-base text-justify">{post.body}</span>
            <div className="flex gap-2 items-center text-xs text-nxGrayLight">
              <span className="text-base text-justify flex items-center gap-2">
                <AiFillLike /> {post?.reactions?.likes || "0"}
              </span>
              <div className="rounded-full w-1 h-1 bg-nxGrayLight"></div>
              <span className="text-base text-justify flex items-center gap-2">
                <AiFillDislike /> {post?.reactions?.dislikes || "0"}
              </span>
              <div className="rounded-full w-1 h-1 bg-nxGrayLight"></div>
              <span className="text-base text-justify flex items-center gap-2">
                <AiOutlineComment /> {post?.views || "0"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-sm py-1">Comments</span>
              {post?.comments?.map((keys: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-1 border rounded-md border-nxGrayBorder p-2"
                  >
                    <span className="text-base font-bold text-justify">
                      {keys.user.fullName}{" "}
                      <span className="text-sm font-bold text-nxGrayBorder pl-2">
                        {keys.user.username}
                      </span>
                    </span>
                    <span className="text-base text-justify">{keys.body}</span>
                    <div className="flex gap-2 items-center text-xs text-nxGrayLight">
                      <span className="text-base text-justify flex items-center gap-2">
                        <AiFillLike /> {keys.likes}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr className="torder border-nxGrayBorder" />
          <span className="text-sm font-bold">Another Post from this User</span>
          {allPost != undefined
            ? allPost.map((key: any, index: number) => {
                return (
                  <Link
                    href={`/posts/${key.id}`}
                    key={index}
                    className="rounded-md border-nxGrayBorder hover:bg-nxGrayDark"
                  >
                    <div className="flex flex-col gap-1 border rounded-md border-nxGrayBorder p-2">
                      <span className="text-base text-justify">{key.body}</span>
                      <div className="flex gap-2 items-center text-xs text-nxGrayLight">
                        <span className="text-base text-justify flex items-center gap-2">
                          <AiFillLike /> {key?.reactions?.likes || "0"}
                        </span>
                        <div className="rounded-full w-1 h-1 bg-nxGrayLight"></div>
                        <span className="text-base text-justify flex items-center gap-2">
                          <AiFillDislike /> {key?.reactions?.dislikes || "0"}
                        </span>
                        <div className="rounded-full w-1 h-1 bg-nxGrayLight"></div>
                        <span className="text-base text-justify flex items-center gap-2">
                          <AiOutlineComment /> {key?.views || "0"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            : "Not Found"}
        </div>
      ) : (
        <div className="w-full h-fit p-3">
          <SkeletonPost />
        </div>
      )}
    </>
  );
};

export default DetailPostsPage;
