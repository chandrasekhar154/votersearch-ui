import "./SideBar.css";

interface ISideBarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function SideBar({ isOpen, closeSidebar }: ISideBarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={isOpen ? "sidebar-backdrop active" : "sidebar-backdrop"}
        onClick={closeSidebar}
      />

      <div className={isOpen ? "sidebar-container open" : "sidebar-container"}>
        <div className="sidebar-chat-list">
          <div className="sidebar-chat-item">Chat 1</div>

          <div className="sidebar-chat-item">Chat 2</div>
        </div>
      </div>
    </>
  );
}
