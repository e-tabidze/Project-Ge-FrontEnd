import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "../Reusable components/menuItem";

import "../CSS/dropdownMenu.css";

const DropDownMenu = ({ onClick, currentUser }) => {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="dropdown-main-container">
      <div className="dropdown-container">
        <div className="menu-item">
          {currentUser && (
            <Link to="/my-profile">
              <MenuItem
                icon={<i className="fa fa-user fa-lg icon" />}
                label={"ჩემი გვერდი"}
                onClick={(e) => onClick(e)}
              />
            </Link>
          )}
        </div>
        <div className="menu-item">
          <MenuItem
            icon={<i className="fa fa-bell fa-lg icon" />}
            label={"კონტაქტი"}
            onClick={(e) => onClick(e)}
          />
        </div>
        <div className="menu-item">
          <Link to="/terms">
            <MenuItem
              icon={<i className="fa fa-exclamation-circle fa-lg" />}
              label={"საიტის წესები"}
              onClick={(e) => onClick(e)}
            />
          </Link>
        </div>
        {currentUser && (
          <MenuItem
            icon={<i className="fa fa-sign-out fa-lg icon" />}
            label={"გასვლა"}
            onClick={logOut}
          />
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
