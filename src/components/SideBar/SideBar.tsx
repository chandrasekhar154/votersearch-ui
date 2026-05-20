import { useState } from "react";
import { FaBars } from "react-icons/fa";
import './SideBar.css'

export default function SideBar() {

	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	function toggleSideBar() {
		setIsCollapsed(!isCollapsed);
	}

	return (
		<div className={isCollapsed ? "sidebar-container collapsed" : "sidebar-container"}>
			<div className="sidebar-header">
				<FaBars
					className="sidebar-toggle-icon"
					onClick={toggleSideBar}
					size={'1.3em'}
				/>
			</div>
			<div className="sidebar-chatlist">
				<div className="sidebar-chat-item">
					{!isCollapsed && "Chat 1"}
				</div>
				<div className="sidebar-chat-item">
					{!isCollapsed && "Chat 2"}
				</div>
			</div>
		</div>
	);
}