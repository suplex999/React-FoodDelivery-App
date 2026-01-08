const OrderSuccess = () => {
  const { state } = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-12 bg-white rounded-3xl shadow-2xl">
        <div className="w-32 h-32 bg-emerald-500 rounded-3xl mx-auto mb-8 flex items-center justify-center text-4xl text-white">
          ✓
        </div>
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-slate-600 mb-8">Total: ₹{state?.orderTotal?.toLocaleString()}</p>
        <Link to="/Productlist" className="bg-sky-500 hover:bg-sky-600 text-white px-12 py-4 rounded-2xl font-bold text-xl">
          Order More →
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;