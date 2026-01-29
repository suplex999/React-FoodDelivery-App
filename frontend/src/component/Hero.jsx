import React from "react";
import food from "../assets/food.mp4";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import ProductsPage from "./ProductsPage";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background video */}
      <video
        src={food}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Dark overlay (optional, for readability) */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center  px-8 md:px-16">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
          Delicious Food
        </h1>
        <p className="mt-6 max-w-2xl text-2xl md:text-3xl font-medium text-slate-100">
          From everyday delicacies to delicious meals, redefine your taste with
          meals that are as bold and unique as you are.
        </p>
     {/* Sign in button */}
        <div className="mt-8">
          <Link
            to= "/Login"
            className="cursor-pointer hover:bg-sky-500 inline-flex items-center justify-center rounded-full bg- gradient-to-r from-[#ff00b4] to-[#00d2ff] px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-pink-300/40 hover:brightness-110 active:scale-[0.97] transition"
          >
            Sign in to order now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

