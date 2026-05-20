import ChatPanel from "../components/ChatPanel/ChatPanel";
import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";
import './MainLayout.css'

export default function MainLayout() {
	return (
		<div className="main-layout-container">
			<TopBar />
			<div className="main-layout-body">
				<SideBar />
				<ChatPanel />
			</div>
		</div>
	);
}