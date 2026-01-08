// ProductsPage.jsx
import React, { useState, useMemo, useContext } from "react";
import { ShopContext } from "./Shopcontext";
import { Link } from "react-router-dom";



const ProductsPage = () => {
  const { products, addToCart } = useContext(ShopContext);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(q);
      const categoryMatch = item.category?.toLowerCase().includes(q);
      return nameMatch || categoryMatch;
    });
  }, [query, products]); // filter products in memory [web:271][web:280]


  return (
    <section className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header + search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Dishes
            </h1>
            <p className="text-sm text-slate-500">
              Search by dish name or category (Pizza, Rice, Noodles, Chicken…).
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full rounded-full border border-slate-300 bg-white/80 px-4 py-2.5 text-sm outline-none shadow-sm focus:border-[#ff00b4] focus:ring-2 focus:ring-[#ff00b4]/40 transition"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-slate-500">
            No dishes found for <span className="font-semibold">{query}</span>.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                      {item.name}
                    </h2>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-emerald-600">
                      ₹{item.price}
                    </span>
                    <button className="inline-flex rounded-full bg-linear-to-r from-[#ff00b4] to-[#00d2ff] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:brightness-110 active:scale-[0.97] transition">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
    
  );
};

export default ProductsPage;
