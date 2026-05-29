import { useState } from "react";
import ChatPanel from "../components/ChatPanel/ChatPanel";
import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";
import "./MainLayout.css";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSideBar() {
    setIsSidebarOpen((prev) => !prev);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <div className="main-layout-container">
      <TopBar toggleSideBar={toggleSideBar} />
      <div className="main-layout-body">
        <SideBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <ChatPanel />
      </div>
    </div>
  );
}
