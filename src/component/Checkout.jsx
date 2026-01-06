// CheckoutFormRHF.jsx
import React from "react";
import { useForm } from "react-hook-form";

function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      pincode: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // call API here
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-6 py-7">
        <h2 className="text-2xl font-semibold text-slate-900 text-center mb-1">
          Delivery Details
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6">
          Enter your address to get your food delivered fast.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className={`block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition
                ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400"
                }
              `}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="10-digit mobile number"
              className={`block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition
                ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400"
                }
              `}
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid 10-digit Indian number",
                },
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              rows="3"
              placeholder="Flat / Street / Area"
              className={`block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition resize-none
                ${
                  errors.address
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400"
                }
              `}
              {...register("address", {
                required: "Delivery address is required",
                minLength: {
                  value: 10,
                  message: "Address should be at least 10 characters",
                },
              })}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Pincode
            </label>
            <input
              id="pincode"
              type="text"
              placeholder="6-digit pincode"
              className={`block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition
                ${
                  errors.pincode
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400"
                }
              `}
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Enter valid 6-digit pincode",
                },
              })}
            />
            {errors.pincode && (
              <p className="mt-1 text-xs text-red-500">
                {errors.pincode.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 w-full inline-flex items-center justify-center rounded-full bg-gradient-to -r from-emerald-500 to-lime-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-400/40 hover:shadow-lg hover:shadow-emerald-400/50 hover:from-emerald-600 hover:to-lime-600 active:scale-[0.98] transition"
          >
            Place Order
          </button>

          {isSubmitSuccessful && (
            <p className="text-sm text-emerald-600 text-center mt-2">
              Order details submitted successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Checkout;
