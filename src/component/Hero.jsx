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


// import React from 'react'
// import hero_img from '../assets/hero_img.jpg'
// import hero_img2 from '../assets/hero_img2.jpg'
// import hero_img3 from '../assets/hero_img3.jpg'
// import food from '../assets/food.mp4' 
// const Hero = () => {
//   return (
//     <div className='hero h-screen flex  flex-col items-center'>
//         <div className='flex justify-between items-center gap-4 w-full max-w-screen mt-16'>
           
//               <video src={food} autoPlay muted loop playsInline className='absolute z-0 right-0 bottom-0 '></video>
//                <h1 className=' text-6xl fon-bold text-white -mt-80 leading-tight'>Delicious Food</h1>
//                 <p className='text-lg font-bold mt-4 text-white'>from everyday delicacies to delicious meals, 
//                     redefine your taste with meals that's as bold and unique as you are</p>
             
               
    
//         </div>
//     </div>
//   )
// }

// export default Hero


 {/* <img src={hero_img} alt="" className='w- [100px] h- [100px] object-cover -ml- mt-10 rounded-[50%] border-8 border-white' />
                <img src={hero_img2}alt="" className='w- [300px] h- [300px] object-cover -ml-8 mt-46 rounded-[50%] border-8 border-white' />
                <img src={hero_img3} alt=""className='w- [100px] h- [100px] object-cover -ml-6 mt-78 rounded-[50%] border-8 border-white' />
           */}
              {/* <div className='max-w-1/2 mt-12 z-'> */}
                {/* <h1 className=' text-6xl fon-bold text-white -mt-80 leading-tight'>Delicious Food</h1>
                <p className='text-lg font-bold mt-4 text-white'>from everyday delicacies to delicious meals, 
                    redefine your taste with meals that's as bold and unique as you are</p> */}
              {/* </div> */}

// HeroSection.jsx
// import React from "react";

// const Hero = () => {
//   return (
//     <section className="bg-slate-100">
//       <video src={food} autoPlay muted loop playsInline className='absolute z-0 right-0 bottom-0 '></video>

//       <div className="mx-auto max-w-6xl px-4 py-16 lg:flex lg:items-center lg:gap-12 lg:py-24">
//         {/* Left content */}
//         <div className="flex-1">
//           <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm mb-4">
//             <span className="h-2 w-2 rounded-full bg-[#ff00b4]" />
//             30‑minute delivery across Mumbai
//           </div>

//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black mb-4">
//             Hot, fresh food
//             <span className="block text-transparent bg-clip-text bg- gradient-to-r from-[#ff00b4] to-[#00d2ff]">
//               delivered to your door.
//             </span>
//           </h1>

//           <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
//             Order from your favorite restaurants and local kitchens. Track in
//             real‑time and enjoy **FOODKART**’s lightning‑fast delivery.
//           </p>

//           {/* CTA row */}
//           <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
//             <button className="inline-flex items-center justify-center rounded-full bg- gradient-to-r from-[#ff00b4] to-[#00d2ff] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-300/40 hover:brightness-110 active:scale-[0.98] transition">
//               Order Now
//             </button>
//             <button className="inline-flex items-center justify-center rounded-full border border-black/80 px-6 py-2.5 text-sm font-semibold text-black bg-white hover:bg-black hover:text-white transition">
//               View Menu
//             </button>
//           </div>

//           {/* Small stats */}
//           <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-slate-700">
//             <div>
//               <p className="font-semibold text-black">5000+</p>
//               <p>Monthly orders</p>
//             </div>
//             <div>
//               <p className="font-semibold text-black">4.8/5</p>
//               <p>Average rating</p>
//             </div>
//             <div>
//               <p className="font-semibold text-black">150+</p>
//               <p>Partner restaurants</p>
//             </div>
//           </div>
//         </div>

//         {/* Right image / card */}
//         <div className="flex-1 mt-10 lg:mt-0">
//           <div className="relative mx-auto max-w-sm">
//             <div className="absolute -inset-1 rounded-3xl bg- gradient-to-tr from-[#ff00b4] via-[#00d2ff] to-black opacity-70 blur-lg" />
//             <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden">
//               <img
//                 src="/hero-food.jpg" // replace with your hero image
//                 alt="Delicious food delivery"
//                 className="h-64 w-full object-cover"
//               />
//               <div className="p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="text-sm font-semibold text-black">
//                     Tonight&apos;s top pick
//                   </p>
//                   <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
//                     25 min
//                   </span>
//                 </div>
//                 <p className="text-xs text-slate-600 mb-3">
//                   Spicy paneer bowl with fresh veggies and **FOODKART**
//                   special sauce.
//                 </p>
//                 <button className="w-full rounded-full bg-black text-white text-xs font-semibold py-2 hover:bg-[#111111] transition">
//                   Add to cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
