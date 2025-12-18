import { NavLink, useNavigate } from "react-router";
import { FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const base = "transition rounded-3xl p-1.5";
  const active = "font-semibold rounded-2xl bg-[#339df9] text-white p-1.5";
  const hover =
    "hover:rounded-3xl hover:bg-[#339df9] hover:text-white  hover:transition-all ";
  const [menuOpen, setMenuOpen] = useState(false);

  const navbarItems = [
    {
      title: "Home",
      route: "/",
    },
    {
      title: "Projects",
      route: "/projects",
    },
    {
      title: "Experience",
      route: "/experience",
    },
    {
      title: "Blog",
      route: "/blog",
    },
    {
      title: "Contact",
      route: "/contact",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav className="border-b sticky top-3 z-50 mx-auto backdrop-blur-md bg-white/90 text-center px-8 w-fit left-[90%] sm:left-0 rounded-l-xl md:rounded-full">
        <div className="py-4 flex sm:items-center sm:justify-center items-end justify-end ">
          {/*Desktop nav*/}
          <div className="hidden md:flex items-center gap-6">
            <div className="space-x-4 text-sm text-secondary">
              {navbarItems.map((item) => (
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    `${isActive ? active : base}  ${hover}`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>

          <div className=" md:hidden flex right-1 items-center gap-4">
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
          <div className="absolute -left-12 top-20 z-50 backdrop-blur-md bg-white/90 md:hidden rounded-md border-t px-6 py-4 space-y-2 text-center flex flex-col">
            {navbarItems.map((item) => (
              <NavLink
                key={item.route}
                to={item.route}
                className={({ isActive }) => (isActive ? active : base)}
                onClick={(e) => {
                  e.preventDefault(); // stop NavLink auto-nav
                  setMenuOpen(false); // close sheet first
                  navigate(item.route); // then navigate
                }}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
