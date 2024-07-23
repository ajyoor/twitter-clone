import React from "react";
import LeftbarMenu from "@/components/LeftbarMenu";
import RightbarMenu from "@/components/RightbarMenu";

const MainLayout = ({ children }: any) => {
  return (
    <>
      <LeftbarMenu />
      {children}
      <RightbarMenu />
    </>
  );
};

export default MainLayout;
