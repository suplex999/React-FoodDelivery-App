// LoginPage.jsx
import React from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
   const navigate = useNavigate();

  const onSubmit = (data) => {
    // 1) read saved user
    const saved = localStorage.getItem("foodkartUsers");

    if (!saved) {
      alert("No user found. Please sign up first.");
      return;
    }

    const user = JSON.parse(saved);

    // 2) check credentials
    const isEmailOk = user.email === data.email;
    const isPasswordOk = user.password === data.password;

    if (!isEmailOk || !isPasswordOk) {
      alert("Invalid email or password");
      return;
    }

    // 3) mark user as logged in
    localStorage.setItem("foodkartAuth", "logged-in");

    // 4) go to home / orders page
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 bg- [radial-gradient(circle_at_left,_rgba(255,0,180,0.12),_transparent_55%),radial-gradient(circle_at_right,_rgba(0,210,255,0.12),_transparent_55%)]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-t-4 border-black px-8 pt-8 pb-6">
        {/* Logo + brand */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src={logo}
            alt="Foodkart logo"
            className="h-10 w-auto"
          />
          <span className="text-xs tracking-[0.35em] font-extrabold text-black">
            FOODKART
          </span>
        </div>

        <h1 className="text-3xl font-bold text-center text-black mb-1">
          Login
        </h1>
        <p className="text-xs text-center text-slate-500 mb-6">
          Order your favorite meals with{" "}
          <span className="font-semibold text-[#ff00b4]">FOODKART</span>.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter Email Address"
              className={`w-full rounded-full border px-4 py-2.5 text-sm bg-slate-50 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#00d2ff] focus:border-transparent ${
                errors.email ? "border-red-500" : "border-slate-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full rounded-full border px-4 py-2.5 text-sm bg-slate-50 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#00d2ff] focus:border-transparent ${
                errors.password ? "border-red-500" : "border-slate-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember + forgot */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-400 text-[#ff00b4] focus:ring-[#ff00b4]"
                {...register("rememberMe")}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-slate-500 hover:text-[#ff00b4] transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer hover:bg-[#00d2ff] w-full inline-flex justify-center rounded-full bg- gradient-to-r from-[#ff00b4] to-[#00d2ff] px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-pink-300/40 hover:shadow-xl hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? "LOGGING IN..." : "LOGIN"}
          </button>
          
          <div className="text-center text-[11px] text-slate-400 mt-1">
            Don't have an account? <Link to="/signup" className="text-blue-700 cursor-pointer hover:text-red-500 ">Sign up now</Link>
          </div>


          {/* Social login */}
          <div className="text-center text-[11px] text-slate-400 mt-1">
            or login with
          </div>
          <div className="flex justify-center gap-3 pt-1">
            <button
              type="button"
              className="h-9 w-9 rounded-full border-2 border-[#00d2ff] text-xs font-bold text-[#00d2ff] flex items-center justify-center bg-white hover:bg-[#00d2ff] hover:text-white transition"
            >
              f
            </button>
            <button
              type="button"
              className="h-9 w-9 rounded-full border-2 border-[#ff00b4] text-xs font-bold text-[#ff00b4] flex items-center justify-center bg-white hover:bg-[#ff00b4] hover:text-white transition"
            >
              G+
            </button>
            <button
              type="button"
              className="h-9 w-9 rounded-full border-2 border-black text-xs font-bold text-black flex items-center justify-center bg-white hover:bg-black hover:text-white transition"
            >
              X
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

// // LoginPage.jsx
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     // 1) read saved user
//     const saved = localStorage.getItem("foodkartUser");

//     if (!saved) {
//       alert("No user found. Please sign up first.");
//       return;
//     }

//     const user = JSON.parse(saved);

//     // 2) check credentials
//     const isEmailOk = user.email === data.email;
//     const isPasswordOk = user.password === data.password;

//     if (!isEmailOk || !isPasswordOk) {
//       alert("Invalid email or password");
//       return;
//     }

//     // 3) mark user as logged in
//     localStorage.setItem("foodkartAuth", "logged-in");

//     // 4) go to home / orders page
//     navigate("/homepage");
//   };

//   return (
//     <form className='flex justify-center items-center'onSubmit={handleSubmit(onSubmit)}>
//       <input
//         {...register("email", { required: true })}
//         placeholder="Email"
//         type="email"
//       />
//       <input
//         {...register("password", { required: true })}
//         placeholder="Password"
//         type="password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginPage;
