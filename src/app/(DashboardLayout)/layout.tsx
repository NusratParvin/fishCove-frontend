import { ReactNode } from "react";

import MenuSidebar from "./components/menuSidebar";
import Sidebar from "./components/sidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="aqua flex flex-col md:flex-row w-full gap-0">
      {/* Left Sidebar */}
      <div className="md:w-[20%] w-full  ">
        <div className="fixed top-0 h-screen">
          <MenuSidebar />
        </div>
      </div>

      {/* Middle Content (children) */}
      <div className="md:w-[55%] w-full relative overflow-y-auto">
        {children}
      </div>

      {/* Right Sidebar */}
      <div className="md:w-[25%] w-full relative">
        <div className="  top-0 h-screen">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
