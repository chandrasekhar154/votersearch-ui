import "./SideBar.css";

interface ISideBarProps {
  isCollapsed: boolean;
}

export default function SideBar({ isCollapsed }: ISideBarProps) {
  return (
    <div
      className={
        isCollapsed ? "sidebar-container collapsed" : "sidebar-container"
      }
    >
      <div className="sidebar-chatlist">
        <div className="sidebar-chat-item">{!isCollapsed && "Chat 1"}</div>
        <div className="sidebar-chat-item">{!isCollapsed && "Chat 2"}</div>
      </div>
    </div>
  );
}
