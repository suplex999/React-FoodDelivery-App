import React, { useState, useEffect, useContext } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiUserCircle } from "react-icons/hi";
import logo from "../assets/logo.png";
import axios from "axios"; // ✅ ADDED for backend calls
import { toast } from "react-toastify";

const Navbar = () => {
  const { quantity } = useContext(ShopContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  // ✅ BACKEND AUTH HANDLERS
  const handleAuth = async (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input[name="email"]').value;
    const password = e.target.querySelector('input[name="password"]').value;

    console.log('Navbar sending to backend:', { email, password });

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const res = await axios.post(`http://localhost:5000/api/auth${endpoint}`, {
        email,
        password
      });

      console.log('Backend success:', res.data);

      // ✅ Store tokens + show success
      localStorage.setItem("foodkartAuthToken", res.data.token);
      localStorage.setItem("foodkartUser", JSON.stringify(res.data.user));
      
      toast.success(isLogin ? "Logged in successfully! 🎉" : "Account created & logged in! 🎉");
      setShowAuthModal(false);
      
      // Reset form
      e.target.reset();

    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.response?.data?.error || "Authentication failed");
    }
  };

  const navLinkClass =
    "relative cursor-pointer text-sm sm:text-base font-semibold uppercase tracking-wide text-slate-800 hover:text-purple-600 transition group";

  const underline =
    "absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full";

  // ✅ CHECK LOGIN STATUS FROM LOCALSTORAGE
  const isLoggedIn = !!localStorage.getItem('foodkartAuthToken');
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('foodkartUser')) : null;

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
            <button
              onClick={() => scrollToSection("home")}
              className={navLinkClass}
            >
              Home
              <span className={underline} />
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("products")}
              className={navLinkClass}
            >
              Dishes
              <span className={underline} />
            </button>
          </li>
          <li>
            <Link to="/contact" className={navLinkClass}>
              Contact Us
              <span className={underline} />
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem("foodkartAuthToken");
                  localStorage.removeItem("foodkartUser");
                  toast.success("Logged out successfully! 👋");
                  window.location.reload(); // Refresh to update UI
                }}
                className={navLinkClass}
              >
                Logout
                <span className={underline} />
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className={navLinkClass}
              >
                Login
                <span className={underline} />
              </button>
            )}
          </li>
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="hidden sm:block">
            <FaHome className="text-2xl sm:text-3xl cursor-pointer text-slate-800 hover:text-purple-500 transition-transform duration-200 hover:-translate-y-0.5" />
          </Link>

          <Link to="/cart" className="relative">
            <MdOutlineShoppingCart className="text-2xl sm:text-3xl cursor-pointer text-slate-800 hover:text-purple-500 transition-transform duration-200 hover:-translate-y-0.5" />
            {quantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-[10px] sm:text-xs h-5 w-5 flex items-center justify-center rounded-full font-bold">
                {quantity}
              </span>
            )}
          </Link>
          <Link
            to="/support"
            className="p-2 hover:bg-emerald-100 rounded-full transition"
          >
            <svg
              className="w-6 h-6 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l.707.707a1 1 0 00.707.293H9a1 1 0 00.707-.293l.707-.707V8a4 4 0 118 0v3.586l.707.707a1 1 0 00.707.293H19a1 1 0 00.707-.293l.707-.707V8a6 6 0 00-6-6z" />
            </svg>
          </Link>

          {/* User Profile */}
          {isLoggedIn && (
            <div className="hidden sm:flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
              <HiUserCircle className="text-2xl text-purple-600" />
              <span className="text-sm font-semibold text-slate-800">
                {user?.email.slice(0, 8)}...
              </span>
            </div>
          )}

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
              <button
                onClick={() => scrollToSection("home")}
                className="py-2 border-b border-slate-100 hover:text-purple-600"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="py-2 border-b border-slate-100 hover:text-purple-600"
              >
                Dishes
              </button>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="py-2 border-b border-slate-100 hover:text-purple-600"
              >
                Contact Us
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("foodkartAuthToken");
                    localStorage.removeItem("foodkartUser");
                    toast.success("Logged out! 👋");
                    setOpen(false);
                    window.location.reload();
                  }}
                  className="py-2 hover:text-purple-600"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="py-2 hover:text-purple-600"
                >
                  Login
                </button>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* ✅ BACKEND AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-200/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {isLogin ? "Login to FoodKart" : "Create Account"}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-2xl text-slate-600 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full p-4 border border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 text-lg"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="w-full p-4 border border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 text-lg"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
              >
                {isLogin
                  ? "Need an account? Register"
                  : "Already have account? Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;




// import React, { useState, useEffect, useContext } from "react";
// import { FaHome } from "react-icons/fa";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { ShopContext } from "./ShopContext";
// import { Link } from "react-router-dom";  // ✅ Only Link (no NavLink for smooth scroll)
// import { HiMenu, HiX, HiUserCircle } from "react-icons/hi";
// import logo from "../assets/logo.png";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const { quantity } = useContext(ShopContext); // ✅ Backend auth
//   const { user, login, register, logout } = useAuth();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false); // ✅ Auth modal
//   const [isLogin, setIsLogin] = useState(true); // ✅ Login/Register toggle

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ SMOOTH SCROLL FUNCTION
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//     setOpen(false); // Close mobile menu
//   };

//   // ✅ AUTH HANDLERS
//   const handleAuth = async (e) => {
//     e.preventDefault();

//     const emailInput = e.target.querySelector('input[name="email"]').value;
//     const passwordInput = e.target.querySelector(
//       'input[name="password"]',
//     ).value; // ✅ FIXED

//     console.log('Frontend sending:', { email: emailInput, password: passwordInput }); // ✅ DEBUG

//     const result = isLogin
//       ? await login(emailInput, passwordInput)
//       : await register(emailInput, passwordInput);

//     if (result?.success) {
//       toast.success(isLogin ? "Logged in successfully!" : "Account created!"); // ✅ ADD
//       setShowAuthModal(false);
//     } else {
//       toast.error(result?.error || "Authentication failed");
//     }
//   };
//   const navLinkClass =
//     "relative cursor-pointer text-sm sm:text-base font-semibold uppercase tracking-wide text-slate-800 hover:text-purple-600 transition group";

//   const underline =
//     "absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full";

//   return (
//     <header className="fixed top-0 left-0 w-full z-50">
//       <nav
//         className={`
//           mx-auto max-w-6xl
//           flex items-center justify-between
//           px-4 sm:px-6 lg:px-8
//           mt-3
//           rounded-full
//           border border-white/20
//           backdrop-blur-lg
//           transition-all duration-500
//           ${isScrolled ? "bg-white/90 shadow-lg py-2" : "bg-white/40 py-3"}
//         `}
//       >
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-lg sm:text-2xl font-extrabold text-slate-900"
//         >
//           <img src={logo} alt="FoodKart logo" className="w-9 h-9" />
//           <span>
//             <span className="text-black">Food</span>Kart
//           </span>
//         </Link>

//         {/* Desktop links - SMOOTH SCROLL + ROUTING */}
//         <ul className="hidden md:flex items-center gap-8">
//           <li>
//             <button
//               onClick={() => scrollToSection("home")}
//               className={navLinkClass}
//             >
//               Home
//               <span className={underline} />
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => scrollToSection("products")}
//               className={navLinkClass}
//             >
//               Dishes
//               <span className={underline} />
//             </button>
//           </li>
//           <li>
//             <Link to="/contact" className={navLinkClass}>
//               Contact Us
//               <span className={underline} />
//             </Link>
//           </li>
//           <li>
//             {user ? (
//               <button onClick={logout} className={navLinkClass}>
//                 Logout
//                 <span className={underline} />
//               </button>
//             ) : (
//               <button
//                 onClick={() => setShowAuthModal(true)}
//                 className={navLinkClass}
//               >
//                 Login
//                 <span className={underline} />
//               </button>
//             )}
//           </li>
//         </ul>

//         {/* Right icons */}
//         <div className="flex items-center gap-4 sm:gap-6">
//           <Link to="/" className="hidden sm:block">
//             <FaHome className="text-2xl sm:text-3xl cursor-pointer text-slate-800 hover:text-purple-500 transition-transform duration-200 hover:-translate-y-0.5" />
//           </Link>

//           <Link to="/cart" className="relative">
//             <MdOutlineShoppingCart className="text-2xl sm:text-3xl cursor-pointer text-slate-800 hover:text-purple-500 transition-transform duration-200 hover:-translate-y-0.5" />
//             {quantity > 0 && (
//               <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-[10px] sm:text-xs h-5 w-5 flex items-center justify-center rounded-full font-bold">
//                 {quantity}
//               </span>
//             )}
//           </Link>

//           {/* User Profile */}
//           {user && (
//             <div className="hidden sm:flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//               <HiUserCircle className="text-2xl text-purple-600" />
//               <span className="text-sm font-semibold text-slate-800">
//                 {user.email.slice(0, 8)}...
//               </span>
//             </div>
//           )}

//           {/* Mobile menu button */}
//           <button
//             className="md:hidden inline-flex items-center justify-center rounded-full p-1.5 bg-white/60 hover:bg-white transition"
//             onClick={() => setOpen((prev) => !prev)}
//           >
//             {open ? (
//               <HiX className="text-2xl text-slate-900" />
//             ) : (
//               <HiMenu className="text-2xl text-slate-900" />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile menu */}
//       {open && (
//         <div className="md:hidden mt-2 px-4">
//           <div className="mx-auto max-w-6xl rounded-3xl bg-white/95 shadow-xl backdrop-blur-md py-4">
//             <ul className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide text-slate-800 px-4">
//               <button
//                 onClick={() => scrollToSection("home")}
//                 className="py-2 border-b border-slate-100 hover:text-purple-600"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => scrollToSection("products")}
//                 className="py-2 border-b border-slate-100 hover:text-purple-600"
//               >
//                 Dishes
//               </button>
//               <Link
//                 to="/contact"
//                 onClick={() => setOpen(false)}
//                 className="py-2 border-b border-slate-100 hover:text-purple-600"
//               >
//                 Contact Us
//               </Link>
//               {user ? (
//                 <button
//                   onClick={() => {
//                     logout();
//                     setOpen(false);
//                   }}
//                   className="py-2 hover:text-purple-600"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setShowAuthModal(true);
//                   }}
//                   className="py-2 hover:text-purple-600"
//                 >
//                   Login
//                 </button>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}

//       {/* ✅ AUTH MODAL */}
//       {showAuthModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-200/50">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-slate-900">
//                 {isLogin ? "Login to FoodKart" : "Create Account"}
//               </h2>
//               <button
//                 onClick={() => setShowAuthModal(false)}
//                 className="text-2xl text-slate-600 hover:text-slate-900"
//               >
//                 ×
//               </button>
//             </div>

//             <form onSubmit={handleAuth} className="space-y-4">
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 required
//                 className="w-full p-4 border border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 text-lg"
//               />
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 required
//                 className="w-full p-4 border border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 text-lg"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
//               >
//                 {isLogin ? "Login" : "Register"}
//               </button>
//             </form>

//             <div className="mt-6 pt-6 border-t border-slate-200 text-center">
//               <button
//                 type="button"
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
//               >
//                 {isLogin
//                   ? "Need an account? Register"
//                   : "Already have account? Login"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };;

// export default Navbar;




// import React, { useState, useEffect, useContext } from "react";
// import { FaHome } from "react-icons/fa";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { ShopContext } from "./ShopContext";
// import { Link, NavLink } from "react-router-dom";
// import { HiMenu, HiX } from "react-icons/hi";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const { quantity } = useContext(ShopContext);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinkClass =
//     "relative cursor-pointer text-sm sm:text-base font-semibold uppercase tracking-wide text-slate-800 hover:text-red-700 transition group";

//   const underline =
//     "absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full";

//   return (
//     <header className="fixed top-0 left-0 w-full z-50">
//       <nav
//         className={`
//           mx-auto max-w-6xl
//           flex items-center justify-between
//           px-4 sm:px-6 lg:px-8
//           mt-3
//           rounded-full
//           border border-white/20
//           backdrop-blur-lg
//           transition-all duration-500
//           ${isScrolled ? "bg-white/90 shadow-lg py-2" : "bg-white/40 py-3"}
//         `}
//       >
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-lg sm:text-2xl font-extrabold text-slate-900"
//         >
//           <img src={logo} alt="FoodKart logo" className="w-9 h-9" />
//           <span>
//             <span className="text-black">Food</span>Kart
//           </span>
//         </Link>

//         {/* Desktop links */}
//         <ul className="hidden md:flex items-center gap-8">
//           <li>
//             <NavLink to="/" className={navLinkClass}>
//               Home
//               <span className={underline} />
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/Productlist" className={navLinkClass}>
//               Dishes
//               <span className={underline} />
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/contact" className={navLinkClass}>
//               Contact Us
//               <span className={underline} />
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/login" className={navLinkClass}>
//               Login
//               <span className={underline} />
//             </NavLink>
//           </li>
//         </ul>

//         {/* Right icons */}
//         <div className="flex items-center gap-4 sm:gap-6">
//           <Link to="/" className="hidden sm:block">
//             <FaHome className="text-2xl sm:text-3xl cursor-pointer text-slate-800 hover:text-sky-400 transition-transform duration-200 hover:-translate-y-0.5" />
//           </Link>

//           <Link to="/cart" className="relative">
//             <MdOutlineShoppingCart className="text-2xl sm:text-3xl cursor-pointer text-slate-800 hover:text-sky-400 transition-transform duration-200 hover:-translate-y-0.5" />
//             {quantity > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs h-5 w-5 flex items-center justify-center rounded-full">
//                 {quantity}
//               </span>
//             )}
//           </Link>

//           {/* Mobile menu button */}
//           <button
//             className="md:hidden inline-flex items-center justify-center rounded-full p-1.5 bg-white/60 hover:bg-white transition"
//             onClick={() => setOpen((prev) => !prev)}
//           >
//             {open ? (
//               <HiX className="text-2xl text-slate-900" />
//             ) : (
//               <HiMenu className="text-2xl text-slate-900" />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile menu */}
//       {open && (
//         <div className="md:hidden mt-2 px-4">
//           <div className="mx-auto max-w-6xl rounded-3xl bg-white/95 shadow-xl backdrop-blur-md py-4">
//             <ul className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide text-slate-800 px-4">
//               <NavLink to="/" onClick={() => setOpen(false)}>
//                 <li className="py-2 border-b border-slate-100 hover:text-red-700">
//                   Home
//                 </li>
//               </NavLink>
//               <NavLink to="/Productlist" onClick={() => setOpen(false)}>
//                 <li className="py-2 border-b border-slate-100 hover:text-red-700">
//                   Dishes
//                 </li>
//               </NavLink>
//               <NavLink to="/contact" onClick={() => setOpen(false)}>
//                 <li className="py-2 border-b border-slate-100 hover:text-red-700">
//                   Contact Us
//                 </li>
//               </NavLink>
//               <NavLink to="/login" onClick={() => setOpen(false)}>
//                 <li className="py-2 hover:text-red-700">Login</li>
//               </NavLink>
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;
