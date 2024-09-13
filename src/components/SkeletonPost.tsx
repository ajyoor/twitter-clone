import React from 'react'

const SkeletonPost = () => {
  return (
    <div className="flex flex-row gap-3 py-3 border-b border-nxGrayBorder">
      <div className="w-12 rounded-full bg-nxGrayLight"></div>
      <div className="flex w-full flex-col gap-1">
        <div className="w-44 h-3 rounded-3xl bg-nxGrayLight"></div>
        <div className="w-full h-3 rounded-3xl bg-nxGrayLight"></div>
        <div className="w-72 h-3 rounded-3xl bg-nxGrayLight"></div>
      </div>
    </div>
  );
};

export default SkeletonPost