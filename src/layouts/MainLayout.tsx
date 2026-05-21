import { useState } from "react";
import ChatPanel from "../components/ChatPanel/ChatPanel";
import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";
import './MainLayout.css'

export default function MainLayout() {

	const [isSideBarCollapsed, setIsSideBarCollapsed] = useState<boolean>(false);

	function toggleSideBar() {
		setIsSideBarCollapsed(!isSideBarCollapsed);
	}

	return (
		<div className="main-layout-container">
			<TopBar toggleSideBar={toggleSideBar} />
			<div className="main-layout-body">
				<SideBar isCollapsed={isSideBarCollapsed} />
				<ChatPanel />
			</div>
		</div>
	);
}