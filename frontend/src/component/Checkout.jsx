
// Checkout.jsx - FULLY UPDATED WITH SHOPCONTEXT + API
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "./ShopContext"; // Your API-integrated context
import { toast } from "react-toastify";
// import OrderChat from './OrderChat';

function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      pincode: "",
    },
  });

  const { cart, total, quantity, checkout, clearCart } =
    useContext(ShopContext);
  const navigate = useNavigate();

  // Auto-populate if cart empty
  useEffect(() => {
    if (cart.length === 0) {
      toast.info("No items in cart. Redirecting...");
      navigate("/cart");
    }
  }, [cart.length, navigate]);

  const onSubmit = async (data) => {
    console.log("🚀 onSubmit called with:", data); // DEBUG 1
    console.log("🔥 ShopContext:", {
      cart: cart.length,
      total,
      checkout: !!checkout,
    }); // DEBUG 2

    try {
      const userData = {
        id: "guest_" + Date.now(),
        name: data.name,
        phone: data.phone,
        address: data.address,
        pincode: data.pincode,
      };
      console.log("📤 Calling checkout with:", userData); // DEBUG 3

      const success = await checkout(userData);
      console.log("✅ Checkout result:", success); // DEBUG 4

      if (success) {
        reset();
        toast.success(`Order placed! Total: ₹${total.toLocaleString()}`);
        console.log("➡️ Navigating to /order-success"); // DEBUG 5
        navigate("/order-success", {
          state: { orderTotal: total, itemsCount: quantity },
        });
      } else {
        console.error("❌ Checkout returned false");
        toast.error("Checkout failed - API issue");
      }
    } catch (error) {
      console.error("💥 Checkout ERROR:", error); // DEBUG 6
      toast.error("Order failed. Check console.");
    }
  };

  if (cart.length === 0) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Delivery Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-emerald-100">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold bg-gradient-to- r from-slate-900 to-gray-800 bg-clip-text text-transparent mb-3">
                Delivery Details
              </h2>
              <p className="text-lg text-slate-600 max-w-md mx-auto">
                Enter your details for fast delivery. We'll confirm via SMS.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4
                    ${
                      errors.name
                        ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200"
                        : "border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:ring-emerald-200"
                    }`}
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name too short" },
                  })}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                    <span>⚠️</span> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Mobile Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4
                    ${
                      errors.phone
                        ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200"
                        : "border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:ring-emerald-200"
                    }`}
                  placeholder="98xxxxxxxx"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter valid 10-digit number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                    <span>⚠️</span> {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  rows="4"
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 resize-vertical
                    ${
                      errors.address
                        ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200"
                        : "border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:ring-emerald-200"
                    }`}
                  placeholder="House no, Street, Area/Locality, Landmark"
                  {...register("address", {
                    required: "Address is required",
                    minLength: { value: 10, message: "Address too short" },
                  })}
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                    <span>⚠️</span> {errors.address.message}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Pincode *
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    className={`w-full px-5 py-4 rounded-2xl border-2 text-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4
                      ${
                        errors.pincode
                          ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200"
                          : "border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:ring-emerald-200"
                      }`}
                    placeholder="400xxx"
                    {...register("pincode", {
                      required: "Pincode required",
                      pattern: { value: /^\d{6}$/, message: "6-digit pincode" },
                    })}
                  />
                  {errors.pincode && (
                    <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <span>⚠️</span> {errors.pincode.message}
                    </p>
                  )}
                </div>
                <div className="self-end">
                  <button
                    type="button"
                    onClick={() => setValue("pincode", "401101")} // Bhayandar default
                    className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Use Default
                  </button>
                </div>
              </div>

              {/* Submit */}
              {/* Submit Button - FIXED: NO LINK WRAPPER + DEBUG */}
              <button
                type="submit" // CRITICAL: type="submit" for form handling
                disabled={isSubmitting || cart.length === 0}
                className={`w-full py-5 px-8 text-xl font-bold rounded-3xl shadow-2xl transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-3 group
                ${
                  isSubmitting
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to- r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 shadow-emerald-400/50 hover:shadow-emerald-500/60 hover:scale-[1.02] active:scale-[0.98]"
                }`}
                onClick={() => {
                  // DEBUG: Logs before submit
                  console.log(
                    "🔥 Submit clicked - Cart:",
                    cart.length,
                    "Total:",
                    total,
                  );
                  console.log("🔥 Checkout function available:", !!checkout);
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Place Order Now"
                )}
              </button>
            </form>

            {isSubmitSuccessful && (
              <div className="mt-8 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                  Order Confirmed!
                </h3>
                <p className="text-emerald-700">
                  Check your phone for delivery updates.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* <div className="col-span-1 lg:col-span-2">
          <OrderChat orderId={`order_${Date.now()}`} />
        </div> */}

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-sky-100 sticky top-24 max-h- [600px] overflow-y-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Order Summary
            </h3>

            <div className="space-y-4 mb-8">
              {/* Items */}
              {cart.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      ₹{item.price} x {item.amount}
                    </p>
                  </div>
                  <span className="font-bold text-lg text-sky-600">
                    ₹{(item.price * item.amount).toLocaleString()}
                  </span>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-center text-sm text-slate-500 py-4">
                  +{cart.length - 3} more items
                </p>
              )}
            </div>

            <div className="space-y-4 mb-10 p-6 bg-gradient-to- r from-sky-50 to-emerald-50 rounded-3xl">
              <div className="flex justify-between text-2xl font-bold">
                <span>Total ({quantity} items):</span>
                <span className="text-sky-600">₹{total.toLocaleString()}</span>
              </div>
              <div className="text-xs text-emerald-700 bg-emerald-100 p-3 rounded-2xl text-center">
                Free delivery • Order in 30 mins
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Cash on Delivery</span>
                <span>✅ Available</span>
              </div>
              <div className="flex justify-between">
                <span>Secure Checkout</span>
                <span>🔒 Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

