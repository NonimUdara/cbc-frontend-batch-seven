// Header.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { MdMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import UserData from "./userData";
import UserMobileData from "./userDataMobile";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: <BsCart3 className="text-2xl text-center" />, path: "/cart" },
];

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSideBarOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto h-[80px] px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logoColour.png"
            alt="Crystal Beauty Clear"
            className="h-[100px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-secondary font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative transition ${
                  isActive ? "text-accent after:w-full" : "hover:text-accent"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:w-0 after:transition-all`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {/* <Link
            to="/cart"
            className="relative text-secondary hover:text-accent transition-colors"
          >
            <BsCart3 className="text-2xl" />
          </Link> */}
          <UserData />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSideBarOpen(true)}
          className="lg:hidden text-secondary text-3xl hover:text-accent transition-colors align-middle"
        >
          <MdMenu />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSideBarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSideBarOpen(false)}
              className="fixed top-0 left-0 h-screen text-secondary z-100"
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-80 bg-primary shadow-lg z-50 lg:hidden flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <Link
                  to="/"
                  className="flex items-center"
                  onClick={handleLinkClick}
                >
                  <img src="" />
                </Link>
                <button
                  onClick={() => setIsSideBarOpen(false)}
                  className="text-secondary text-3xl hover:text-accent transition-colors"
                >
                  <MdClose />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col overflow-y-auto p-6 gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `py-4 px-2 text-lg font-medium transition-colors border-b border-border ${
                        isActive
                          ? "text-accent"
                          : "text-secondary hover:text-accent"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {/* User Info */}
                <div className="p-6 border-t border-none bg-primary">
                  <UserMobileData />
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
