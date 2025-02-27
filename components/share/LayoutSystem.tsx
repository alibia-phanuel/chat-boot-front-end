import React from "react";
const LayoutSystem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-500 relative top-[70px]  h-[calc(100vh-70px)] ">
      {children}
    </div>
  );
};

export default LayoutSystem;
