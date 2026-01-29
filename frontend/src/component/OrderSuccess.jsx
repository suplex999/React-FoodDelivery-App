

import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState({
    orderTotal: 0,
    itemsCount: 0,
    orderId: `ORD-${Date.now().toString().slice(-6)}`  // Fallback
  });

  // Safely extract state on mount
  useEffect(() => {
    console.log('📍 OrderSuccess - location.state:', location.state);  // DEBUG
    if (location.state) {
      setOrderData({
        orderTotal: location.state.orderTotal || 0,
        itemsCount: location.state.itemsCount || 0,
        orderId: location.state.orderId || `ORD-${Date.now().toString().slice(-6)}`
      });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-lime-50 py-12 px-4">
      <div className="text-center p-12 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg mx-auto border border-emerald-100">
        <div className="w-32 h-32 bg-emerald-500 rounded-3xl mx-auto mb-8 flex items-center justify-center text-4xl text-white shadow-2xl">
          ✓
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent mb-6">
          Order Confirmed!
        </h1>
        
        <div className="space-y-4 mb-12">
          <p className="text-2xl text-slate-700 font-semibold">
            Order ID: <span className="text-emerald-600 font-mono">{orderData.orderId}</span>
          </p>
          <p className="text-xl text-slate-600">
            {orderData.itemsCount} items • Total: ₹{orderData.orderTotal.toLocaleString()}
          </p>
          <div className="text-sm text-emerald-600 bg-emerald-100 p-4 rounded-2xl font-medium">
            📱 SMS sent • Delivery in 30-45 mins
          </div>
        </div>
        
        <div className="space-y-3">
          <Link 
            to="/Productlist" 
            className="block w-full bg-sky-500 hover:bg-sky-600 text-white py-4 px-8 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            🍕 Order More →
          </Link>
          <Link 
            to="/"
            className="block w-full border-2 border-slate-300 hover:border-slate-400 text-slate-700 py-4 px-8 rounded-2xl font-semibold text-lg hover:bg-slate-50 transition-all duration-200"
          >
            ← Back Home
          </Link>
        </div>
        
        {/* DEBUG: Show if state missing */}
        {location.state === null && (
          <p className="mt-8 text-xs text-orange-500 p-3 bg-orange-50 rounded-xl font-mono">
            Debug: No state passed (check Checkout navigate)
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
