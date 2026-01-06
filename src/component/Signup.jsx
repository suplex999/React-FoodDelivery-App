import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpSection = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log("Signup success:", res.data);
      localStorage.setItem("foodkartAuthToken", res.data.token);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section
      className="
        min-h-screen
        flex items-center justify-center
        bg-slate-100
        px-4 sm:px-6 lg:px-10
        py-10 sm:py-16 lg:py-20
        bg- [radial-gradient(circle_at_left,_rgba(255,0,180,0.08),_transparent_55%),radial-gradient(circle_at_right,_rgba(0,210,255,0.08),_transparent_55%)]
      "
    >
      <div className="w-full max-w-6xl grid gap-10 lg:gap-14 md:grid-cols-2 items-center">
        {/* Left text */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-3 leading-tight">
            Create your
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#ff00b4] to-[#00d2ff]">
              FOODKART account
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 mb-6 max-w-md mx-auto md:mx-0">
            Save your favourite dishes, track orders faster, and get exclusive
            offers on every FOODKART delivery.
          </p>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 max-w-sm mx-auto md:mx-0">
            <li>• One‑click re‑order of your recent meals</li>
            <li>• Live order tracking and delivery updates</li>
            <li>• Member‑only discounts and rewards</li>
          </ul>
        </div>

        {/* Right card form */}
        <div className="bg-white rounded-3xl shadow-2xl border-t-4 border-black px-5 sm:px-7 lg:px-8 py-7 sm:py-8">
          <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
            Sign up to get started
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mb-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#ff00b4] hover:underline"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full name"
                className={`w-full rounded-full border px-4 py-2.5 text-sm bg-slate-50 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#00d2ff] focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-slate-300"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Enter your full name" },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
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
                placeholder="Password (min 6 characters)"
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

            {/* Terms */}
            <div className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600">
              <input
                type="checkbox"
                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-400 text-[#ff00b4] focus:ring-[#ff00b4]"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
              />
              <span>
                I agree to the <span className="font-semibold">Terms</span> and{" "}
                <span className="font-semibold">Privacy Policy</span>.
              </span>
            </div>
            {errors.terms && (
              <p className="mt-1 text-xs text-red-500">
                {errors.terms.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex justify-center rounded-full bg-linear-to-r from-[#ff00b4] to-[#00d2ff] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-300/40 hover:brightness-110 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;

// // SignUp.jsx
// import React from "react";
// import { useForm } from "react-hook-form";

// const SignUp = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     // 1) build user object
//     const user = {
//       name: data.name,
//       email: data.email,
//       password: data.password, // ONLY for learning
//     };

//     // 2) save to localStorage
//     localStorage.setItem("foodkartUser", JSON.stringify(user));

//     alert("Account created! Now you can log in.");
//   };

//   return (
//     <form className="flex justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
//       <input
//         {...register("name", { required: true })}
//         placeholder="Name"
//       />
//       <input
//         {...register("email", { required: true })}
//         placeholder="Email"
//         type="email"
//       />
//       <input
//         {...register("password", { required: true, minLength: 6 })}
//         placeholder="Password"
//         type="password"
//       />
//       <button type="submit">Sign up</button>
//     </form>
//   );
// };

// export default SignUp;





