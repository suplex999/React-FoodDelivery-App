import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
console.log("ENV:", SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY);

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // keys must match the variables you defined in your EmailJS template
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      alert("Message sent! We’ll get back to you soon.");
      reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Could not send message. Please try again.");
    }
  };

  return (
    <section className="bg-slate-100 py-14 sm:py-20 px-4">
      <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-[1.1fr_1fr] items-start">
        <div className="bg-white rounded-3xl shadow-2xl border-t-4 border-black px-6 sm:px-8 py-8 sm:py-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-2">
            Contact <span className="text-[#ff00b4]">FOODKART</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Have a question about your order or feedback? Send us a message.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
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

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="Order issue, partnership, feedback..."
                className={`w-full rounded-full border px-4 py-2.5 text-sm bg-slate-50 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#00d2ff] focus:border-transparent ${
                  errors.subject ? "border-red-500" : "border-slate-300"
                }`}
                {...register("subject", {
                  required: "Subject is required",
                })}
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us how we can help..."
                className={`w-full rounded-2xl border px-4 py-2.5 text-sm bg-slate-50 outline-none transition resize-none focus:bg-white focus:ring-2 focus:ring-[#00d2ff] focus:border-transparent ${
                  errors.message ? "border-red-500" : "border-slate-300"
                }`}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Please provide a bit more detail",
                  },
                })}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.message.message || errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex justify-center rounded-full bg-linear-to-r from-[#ff00b4] to-[#00d2ff] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-300/40 hover:brightness-110 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700">
          <h3 className="text-lg sm:text-xl font-bold text-black">
            Get in touch
          </h3>
          <p>
            Need help with a current order? Reach out and the FOODKART support
            team will respond within a few minutes during active hours.
          </p>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Customer support
              </p>
              <p className="font-medium">support@foodkart.app</p>
              <p>+91-98765-43210</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Delivery hours
              </p>
              <p>Mon – Sun: 10:00 AM – 11:00 PM</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Address
              </p>
              <p>Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
