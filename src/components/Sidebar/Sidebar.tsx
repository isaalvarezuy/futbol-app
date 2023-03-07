import React from "react";
import Navbar from "@/components/Navbar/Navbar"

const Sidebar = () => {
  return (
    <div className="w-[300px] bg-gray-800 h-full fixed left-0 top-0 p-8 font-body text-white text-4xl">
      Tu<span className="font-medium">Liga</span>
     <Navbar/>
    </div>
  );
};

export default Sidebar;
