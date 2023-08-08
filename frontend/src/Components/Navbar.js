import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../Contexts/SidebarContext";
import { CartContext } from "../Contexts/CartContext";
import { Link } from "react-router-dom";
import { BsCartFill, BsHouse, BsShop } from "react-icons/bs";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  // settings
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCard = () => {
    setAnchorEl(null);
    navigate("/user/card");
  };
  const handleHistory = () => {
    setAnchorEl(null);
    navigate("/user/history");
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <header
      className={`${
        isActive ? "bg-gray-600 py-2 shadow-md" : "bg-gray-600 py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Home */}
        <Link to={"/user/"}>
          <div className="w-[40px] text-white">
            <BsHouse size={30} color="white" />
          </div>
        </Link>

        {/* Shop */}
        <Link to={"/user/products"}>
          <div className="w-[40px] text-white">
            <BsShop size={30} color="white" />
          </div>
        </Link>

        {/* cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsCartFill className="text-4xl" color="white" />
          <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>

        {/* Settings */}
        <div>
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SettingsIcon sx={{ color: "white", fontSize: 40 }} />
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleCard}>My Card</MenuItem>
            <MenuItem onClick={handleHistory}>Payment History</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
