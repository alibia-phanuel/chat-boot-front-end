import NavBar from "./NavBar";

import React from "react";
import Sidebar from "../SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex mt-16">
        {/* Sidebar */}
        <div className="w-64 min-h-screen border-r border-gray-200 bg-white shadow-sm">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 px-8 py-6">
          <main className="h-full rounded-lg">{children}</main>
        </div>
      </div>
    </div>
  );
}
