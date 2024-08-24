"use client";

import { useParams } from "next/navigation";
import React from "react";

const DetailPostsPage = () => {
  const postsId = useParams().detail[0];
  console.log(postsId);
  return <div>halaman ke {postsId}</div>;
};

export default DetailPostsPage;
