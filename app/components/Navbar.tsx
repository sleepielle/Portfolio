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
    <nav className=" border-b sticky top-3 z-50 mx-auto  backdrop-blur-md bg-white/30 text-center rounded-full w-fit px-8 ">
      <div className="py-4 flex items-center justify-center">
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
              to={"/experience"}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Experience
            </NavLink>
            <NavLink
              to={"/blog"}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Blog
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
        <div className="backdrop-blur-md bg-white/30  md:hidden rounded-full border-t border-theme px-6 py-4 space-y-2 space-x-4 text-center">
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
            to={"/experience"}
            className={({ isActive }) => (isActive ? active : base)}
          >
            Experience
          </NavLink>
          <NavLink
            to={"/blog"}
            className={({ isActive }) => (isActive ? active : base)}
            onClick={() => setMenuOpen(false)}
          >
            Blog
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
