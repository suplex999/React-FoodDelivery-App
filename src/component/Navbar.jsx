import React, { useState, useEffect, useContext } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ShopContext } from "./ShopContext";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { quantity } = useContext(ShopContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass =
    "relative cursor-pointer text-sm sm:text-base font-semibold uppercase tracking-wide text-slate-800 hover:text-red-700 transition group";

  const underline =
    "absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full";

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`
          mx-auto max-w-6xl
          flex items-center justify-between
          px-4 sm:px-6 lg:px-8
          mt-3
          rounded-full
          border border-white/20
          backdrop-blur-lg
          transition-all duration-500
          ${isScrolled ? "bg-white/90 shadow-lg py-2" : "bg-white/40 py-3"}
        `}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg sm:text-2xl font-extrabold text-slate-900"
        >
          <img src={logo} alt="FoodKart logo" className="w-9 h-9" />
          <span>
            <span className="text-black">Food</span>Kart
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
              <span className={underline} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/Productlist" className={navLinkClass}>
              Dishes
              <span className={underline} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
              <span className={underline} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={navLinkClass}>
              Login
              <span className={underline} />
            </NavLink>
          </li>
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="hidden sm:block">
            <FaHome className="text-2xl sm:text-3xl cursor-pointer text-slate-800 hover:text-sky-400 transition-transform duration-200 hover:-translate-y-0.5" />
          </Link>

          <Link to="/cart" className="relative">
            <MdOutlineShoppingCart className="text-2xl sm:text-3xl cursor-pointer text-slate-800 hover:text-sky-400 transition-transform duration-200 hover:-translate-y-0.5" />
            {quantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {quantity}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full p-1.5 bg-white/60 hover:bg-white transition"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <HiX className="text-2xl text-slate-900" />
            ) : (
              <HiMenu className="text-2xl text-slate-900" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 px-4">
          <div className="mx-auto max-w-6xl rounded-3xl bg-white/95 shadow-xl backdrop-blur-md py-4">
            <ul className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide text-slate-800 px-4">
              <NavLink to="/" onClick={() => setOpen(false)}>
                <li className="py-2 border-b border-slate-100 hover:text-red-700">
                  Home
                </li>
              </NavLink>
              <NavLink to="/Productlist" onClick={() => setOpen(false)}>
                <li className="py-2 border-b border-slate-100 hover:text-red-700">
                  Dishes
                </li>
              </NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)}>
                <li className="py-2 border-b border-slate-100 hover:text-red-700">
                  Contact Us
                </li>
              </NavLink>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                <li className="py-2 hover:text-red-700">Login</li>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
