import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutAction } from "../../redux/features/AuthUser/authSlice";
import { logoutUser } from "../../utills/logOut";
import { AvatarImg } from "../../constant/images";

const profileIconMenus = [
  {
    name: "Profile",
    badgeName: "New",
    badgeStyle: "text-bg-success",
  },
  {
    name: "Connections",
    badgeName: "💗",
    badgeStyle: "bg-danger",
  },
  {
    name: "Requests",
    badgeName: "👁️",
    badgeStyle: "bg-warning",
  },
];

export const Header = ({ isAuth }) => {
  const userData = useSelector((state)=>state.authReducer?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleToggleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleLogOut = async() => {
    await logoutUser() // backend logout
    dispatch(logoutAction()); // frontend logout
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="nav-link fw-bold px-3">DevTinder 🔥</div>
      <div className="d-flex right-side px-2 gap-2">
        <div className="welcome-user">👋 Welcome, {userData?.firstName || "User"}</div>
        {isAuth && (
          <div className="dropdown">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                width: "44px",
                height: "44px",
                cursor: "pointer",
                border: "1px solid white",
              }}
              onClick={handleToggleClick}
            >
              <img
                src={userData?.profileImage || AvatarImg}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "43px",
                  height: "43px",
                  // objectFit: "cover",
                  fontSize: "8px",
                  textAlign: "center",
                }}

              />
            </div>

            <ul
              className={`dropdown-menu ${
                open ? "show" : ""
              } dropdown-menu-end`}
              aria-labelledby="dropdownMenuButton1"
            >
              {profileIconMenus.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`${item.name.toLocaleLowerCase()}`}
                    className="d-flex justify-content-between dropdown-item"
                  >
                    {item.name}
                    <span className={`badge rounded-pill ${item.badgeStyle}`}>
                      {item.badgeName}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span
                  className="dropdown-item text-danger"
                  onClick={handleLogOut}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
