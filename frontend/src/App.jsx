import { useState } from "react";
import "./index.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Cart from "./component/Cart";
import Homepage from "./pages/Homepage";
import ProductDetails from "./pages/ProductDetails";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./component/Checkout";
import LoginPage from "./component/LoginPage";
import SignUpSection from "./component/Signup";
import ProductList from "./component/ProductList";
import Contact from "./component/Contact";
import ProductsPage from "./component/ProductsPage";
import { Navigate } from "react-router-dom";
import OrderSuccess from "./component/OrderSuccess";
import { AuthProvider } from "./context/AuthContext";
import SupportPage from "./pages/SupportPage";

function App() {
  const [count, setCount] = useState(0);
  const isLoggedIn = () => localStorage.getItem("foodkartAuth") === "logged-in";
  const PrivateRoute = ({ children }) => {
    return isLoggedIn() ? children : <Navigate to="/login" replace />;
  };

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/Productlist" element={<ProductsPage />} /> */}
          <Route path="/Productlist" element={<ProductList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignUpSection />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/support" element={
              <PrivateRoute>
                <SupportPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
