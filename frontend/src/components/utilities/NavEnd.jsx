import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import defaultAvatar from "../../assets/images/user.png";
import { Link } from "react-router";
import toast from "react-hot-toast";
const NavEnd = () => {
  const { user, logOut, authLoading } = useAuth();
  const handleLogout = () => {
    toast.success("Logged out successfully");
    logOut();
  };
  return (
    <div className="flex items-center gap-4">
      <div className="dropdown dropdown-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          tabIndex={0}
          role="button"
        >
          {authLoading ? (
            <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse" />
          ) : user ? (
            <img
              src={authLoading ? defaultAvatar : user.photoURL || defaultAvatar}
              alt="avatar"
              className="w-10 rounded-full"
            />
          ) : (
            <FaUserCircle size={40} />
          )}
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {user ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default NavEnd;
