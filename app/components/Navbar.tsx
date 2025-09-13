import { NavLink } from "react-router";
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const base = "transition text-secondary hover:text-accent";
  const active = "text-accent font-semibold";
  const [menuOpen, setMenuOpen] = useState(false);

  {
    /** using NavLink is what allows us to use active classnames. If I used a Link tag, I couldnt have used the isActive function */
  }
  return (
    <nav className="navbar border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-accent"
        >
          <FaLaptopCode className="text-accent text-xl" />
          <span>Portfolio</span>
        </NavLink>

        {/*Desktop nav*/}
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-secondary">
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Home
            </NavLink>
            <NavLink
              to={"/projects"}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Projects
            </NavLink>
            <NavLink
              to={"/blog"}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Blog
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) => (isActive ? active : base)}
            >
              About
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Contact
            </NavLink>
          </div>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="text-accent text-xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            title="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/*Mobile Nav*/}
      {menuOpen && (
        <div className="md:hidden bg-secondary border-t border-theme px-6 py-4 space-y-2 space-x-4 text-center">
          {" "}
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? active : base)}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to={"/projects"}
            className={({ isActive }) => (isActive ? active : base)}
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            to={"/blog"}
            className={({ isActive }) => (isActive ? active : base)}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) => (isActive ? active : base)}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) => (isActive ? active : base)}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
