import { useRef, useState, useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

interface ITopBarProps {
  toggleSideBar: () => void;
}

export default function TopBar({ toggleSideBar }: ITopBarProps) {
  const [showDropDown, setShowDropDown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  function toggleDropDown() {
    setShowDropDown(!showDropDown);
  }

  function handleLogout() {
    navigate("/");
  }

  function handleOutSideClick(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropDown(false);
    }
  }

  function navigateToProfile() {
    console.log("Navigate to profile..!!");
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutSideClick);

    return function cleanup() {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, []);

  return (
    <div className="top-panel">
      <div className="top-panel-left-section">
        <FaBars className="menu-icon" onClick={toggleSideBar} size={"1.3em"} />
        <div className="top-panel-title">
          <span className="desktop-title">AI - Voter Search</span>
          <span className="mobile-title">AI Voter Search</span>
        </div>
      </div>
      <div className="top-panel-user-section" ref={dropdownRef}>
        <FaUserCircle
          className="user-icon"
          size="1.5em"
          color="grey"
          onClick={toggleDropDown}
        />
        {showDropDown && (
          <div className="user-dropdown">
            <div className="dropdown-item" onClick={navigateToProfile}>
              Profile
            </div>
            <hr />
            <div className="dropdown-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
