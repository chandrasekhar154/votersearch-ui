import { useRef, useState, useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import './TopBar.css'

interface ITopBarProps {
	toggleSideBar: () => void;
}

export default function TopBar({ toggleSideBar }: ITopBarProps) {

	const [showDropDown, setShowDropDown] = useState(false);

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	function toggleDropDown() {
		setShowDropDown(!showDropDown);
	}

	function handleLogout() {
		console.log("Logout clicked..!!")
	}

	function handleOutSideClick(event: MouseEvent) {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setShowDropDown(false);
		}
	}

	function navigateToProfile() {
		console.log("Navigate to profile..!!");
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleOutSideClick);

		return function cleanup() {
			document.removeEventListener('mousedown', handleOutSideClick);
		}
	}, []);

	return (
		<div className="top-panel">
			<div className="top-panel-left-section">
				<FaBars
					className="menu-icon"
					onClick={toggleSideBar}
					size={'1.3em'}
				/>
				<div className="top-panel-title">
					AI - Voter Search
				</div>
			</div>
			<div className="top-panel-user-section" ref={dropdownRef}>
				<FaUserCircle className="user-icon" size='1.5em' color="grey" onClick={toggleDropDown} />
				{
					showDropDown && (
						<div className="user-dropdown">
							<div className="dropdown-item" onClick={navigateToProfile}>
								Profile
							</div>
							<hr />
							<div className="dropdown-item" onClick={handleLogout}>
								Logout
							</div>
						</div>
					)
				}
			</div>
		</div>
	);
}