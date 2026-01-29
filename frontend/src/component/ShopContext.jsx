// original ShopContext.jsx

// import { useState, createContext, useEffect } from "react";

// import { toast } from "react-toastify";


// export const ShopContext = createContext()

// import { productsData } from "../pages/data";

// const ShopContextProvider = ({children}) => {

//     const[products, setProducts]= useState(productsData)

//     const[cart,setCart]=useState([])

//     const [quantity, setQuantity]= useState(0)
//     const [total, setTotal] = useState(0)

//     useEffect(()=>{
//         const total= cart.reduce((accumulator, currentItem) => {
//             const priceAsNumber = parseFloat(currentItem.price);
//             if(isNaN(priceAsNumber)){
//                 return accumulator
//             }
//             return accumulator + priceAsNumber * currentItem.amount
//         },0)
//         setTotal(total)
//     },[cart])

//     useEffect(()=>{
//         if(cart){
//             const amount = cart.reduce((accumulator, currentItem)=>{
//                 return accumulator + currentItem.amount
//             },0)
//             setQuantity(amount)
//         }
//     },[cart])

//     const addToCart = (product, id)=> {

//         const newItem = {...product, amount:1}

//         const cartItem = cart.find((item) => {
//             return item.id === id
//         })
//         if(cartItem){
//             const newCart= [...cart].map((item)=>{
//                 if(item.id===id){
//                     return{...item, amount: cartItem.amount}
//                 }else{
//                     return item
//                 }
//             })
//             setCart(newCart)
//         }else{
//             setCart([...cart, newItem])
//             toast.success("Product added to cart")
//         }    
//     }
//     const clearCart = () =>{
//         setCart([])
//         toast.success("Cart Empty")
//     }
//     const removeFromCart =()=>{
//         const newCart =cart.filter((item)=>{
//             return item.id !==id;
//         })
//         setCart(newCart);
//         toast.success("Product removed successfully")
//     }

//     const increaseQuantity= (id) =>{
//         const cartItem =cart.find((item)=> item.id===id);
//         addToCart(cartItem, id)
//     }
//     const decreaseQuantity=(id)=>{
//         const cartItem = cart.find ((item)=>{
//             return item.id === id;
//         })
//         if(cartItem){
//             const newCart = cart.map((item)=>{
//                 if(item.id === id){
//                     return {...item, amount:cartItem.amount - 1}
//                 }else{
//                     return item
//                 }
//             })
//             setCart(newCart)
//         }
//         else{
//             if(cartItem.amount<2){
//                 removeFromCart(id)
//             }
//         }
//     }
    


//     return(
//         <ShopContext.Provider value={{products, cart, addToCart, removeFromCart, clearCart,increaseQuantity, decreaseQuantity, quantity, total
//          }}>
//             {children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;


// ShopContext.jsx - FIXED VERSION
// import { useState, createContext, useEffect } from "react";
// import { toast } from "react-toastify";
// import { productsData } from "../pages/data";

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => {
//   const [products, setProducts] = useState(productsData);
//   const [cart, setCart] = useState([]);
//   const [quantity, setQuantity] = useState(0);
//   const [total, setTotal] = useState(0);

//   // Total calculation
//   useEffect(() => {
//     const calculatedTotal = cart.reduce((acc, item) => {
//       const priceNum = parseFloat(item.price);
//       return isNaN(priceNum) ? acc : acc + (priceNum * item.amount);
//     }, 0);
//     setTotal(calculatedTotal);
//   }, [cart]);

//   // Quantity calculation
//   useEffect(() => {
//     if (cart.length > 0) {
//       const calculatedQuantity = cart.reduce((acc, item) => acc + item.amount, 0);
//       setQuantity(calculatedQuantity);
//     } else {
//       setQuantity(0);
//     }
//   }, [cart]);

//   // FIXED: addToCart - increments existing or adds new
//   const addToCart = (product, id) => {
//     const existingItem = cart.find((item) => item.id === id);
//     if (existingItem) {
//       // Increment existing amount
//       const newCart = cart.map((item) =>
//         item.id === id ? { ...item, amount: existingItem.amount + 1 } : item
//       );
//       setCart(newCart);
//       toast.success("Quantity increased!");
//     } else {
//       // Add new item
//       const newItem = { ...product, amount: 1 };
//       setCart([...cart, newItem]);
//       toast.success("Product added to cart!");
//     }
//   };

//   // FIXED: clearCart
//   const clearCart = () => {
//     setCart([]);
//     toast.success("Cart cleared!");
//   };

//   // FIXED: removeFromCart - now takes id param
//   const removeFromCart = (id) => {  // Added id param
//     const newCart = cart.filter((item) => item.id !== id);  // Fixed filter
//     setCart(newCart);
//     toast.success("Product removed!");
//   };

//   // FIXED: increaseQuantity - direct increment (no addToCart loop)
//   const increaseQuantity = (id) => {
//     const newCart = cart.map((item) =>
//       item.id === id ? { ...item, amount: item.amount + 1 } : item
//     );
//     setCart(newCart);
//     toast.success("Quantity increased!");
//   };

//   // FIXED: decreaseQuantity - proper logic + remove if <=0
//   const decreaseQuantity = (id) => {
//     const newCart = cart.map((item) => {
//       if (item.id === id && item.amount > 1) {
//         return { ...item, amount: item.amount - 1 };
//       }
//       return item;
//     }).filter((item) => item.id !== id || item.amount > 0);  // Remove if amount=0
//     setCart(newCart);
//     toast.success("Quantity decreased!");
//   };

//   return (
//     <ShopContext.Provider
//       value={{
//         products,
//         cart,
//         addToCart,
//         removeFromCart,  // Now works with (id)
//         clearCart,
//         increaseQuantity,
//         decreaseQuantity,
//         quantity,
//         total,
//       }}
//     >
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


// ShopContext.jsx - FULL API-INTEGRATED VERSION
// import { createContext, useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => {
//   // State
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(false);
//   const [quantity, setQuantity] = useState(0);
//   const [total, setTotal] = useState(0);

//   // API Base (proxied by Vite)
//   const API_BASE = "/api";

//   // Fetch products from JSON Server
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE}/products`);
//       setProducts(response.data);
//       toast.success("Products loaded!");
//     } catch (error) {
//       console.error("Fetch products error:", error);
//       toast.error("Failed to load products. Using fallback data.");
//       // Fallback to local if API fails (optional)
//       // setProducts(fallbackProducts);
//     } finally {
//       setProductsLoading(false);
//     }
//   }, []);

//   // Load user's cart from API (by userId or session)
//   const fetchCart = useCallback(async (userId = "guest") => {
//     try {
//       const response = await axios.get(`${API_BASE}/carts?userId=${userId}`);
//       if (response.data.length > 0) {
//         setCart(response.data[0].items || []);
//         toast.info("Cart restored!");
//       }
//     } catch (error) {
//       console.error("Fetch cart error:", error);
//     }
//   }, []);

//   // Save cart to API
//   const saveCart = async (newCart, userId = "guest") => {
//     try {
//       await axios.put(`${API_BASE}/carts/${userId}`, {
//         userId,
//         items: newCart,
//         updatedAt: new Date().toISOString()
//       });
//     } catch (error) {
//       console.error("Save cart error:", error);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchProducts();
//     fetchCart();  // Load cart for current user
//   }, [fetchProducts, fetchCart]);

//   // FIXED Cart Functions (from your previous fixes + API sync)
//   const addToCart = (product, id) => {
//     const existingItem = cart.find((item) => item.id === id);
//     let newCart;
//     if (existingItem) {
//       newCart = cart.map((item) =>
//         item.id === id ? { ...item, amount: existingItem.amount + 1 } : item
//       );
//     } else {
//       newCart = [...cart, { ...product, amount: 1 }];
//     }
//     setCart(newCart);
//     toast.success("Added to cart!");
//     saveCart(newCart);  // API sync
//   };

//   const removeFromCart = (id) => {
//     const newCart = cart.filter((item) => item.id !== id);
//     setCart(newCart);
//     toast.success("Removed from cart!");
//     saveCart(newCart);
//   };

//   const clearCart = () => {
//     setCart([]);
//     toast.success("Cart cleared!");
//     saveCart([]);
//   };

//   const increaseQuantity = (id) => {
//     const newCart = cart.map((item) =>
//       item.id === id ? { ...item, amount: item.amount + 1 } : item
//     );
//     setCart(newCart);
//     toast.success("Quantity increased!");
//     saveCart(newCart);
//   };

//   const decreaseQuantity = (id) => {
//     const newCart = cart
//       .map((item) => {
//         if (item.id === id && item.amount > 1) {
//           return { ...item, amount: item.amount - 1 };
//         }
//         return item;
//       })
//       .filter((item) => item.id !== id || item.amount > 0);
//     setCart(newCart);
//     toast.success("Quantity decreased!");
//     saveCart(newCart);
//   };

//   // Checkout - save order to API
//   const checkout = async (userData) => {
//     try {
//       const order = {
//         id: Date.now(),
//         userId: userData.id || "guest",
//         items: cart,
//         total,
//         status: "pending",
//         createdAt: new Date().toISOString()
//       };
//       await axios.post(`${API_BASE}/orders`, order);
//       clearCart();
//       toast.success("Order placed successfully!");
//       return true;
//     } catch (error) {
//       console.error("Checkout error:", error);
//       toast.error("Checkout failed. Try again.");
//       return false;
//     }
//   };

//   // Recalculate quantity & total
//   useEffect(() => {
//     const calcQuantity = cart.reduce((acc, item) => acc + (item.amount || 0), 0);
//     setQuantity(calcQuantity);

//     const calcTotal = cart.reduce((acc, item) => {
//       const price = parseFloat(item.price) || 0;
//       return acc + (price * (item.amount || 0));
//     }, 0);
//     setTotal(calcTotal);
//   }, [cart]);

//   // Refresh products (e.g., after admin update)
//   const refreshProducts = () => fetchProducts();

//   const value = {
//     products,
//     productsLoading,
//     cart,
//     quantity,
//     total,
//     loading,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     increaseQuantity,
//     decreaseQuantity,
//     checkout,
//     fetchProducts,
//     refreshProducts
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


// ShopContext.jsx - FULL BACKEND API INTEGRATION
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // State (unchanged)
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null); // ✅ New: User state

  // ✅ Backend API Base URL
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // ✅ Fetch products from MongoDB Backend
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE}/products`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProducts(response.data);
      toast.success("Products loaded from backend!");
    } catch (error) {
      console.error("Fetch products error:", error);
      toast.error("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  }, [API_BASE]);

  // ✅ Fetch user cart from backend (JWT protected)
  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // No auth = empty cart

      const response = await axios.get(`${API_BASE}/orders/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.length > 0) {
        // Use latest "pending" order as cart
        const pendingOrder = response.data.find(
          (order) => order.status === "pending",
        );
        if (pendingOrder) {
          setCart(pendingOrder.items || []);
          toast.info("Cart restored from backend!");
        }
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  }, [API_BASE]);

  // ✅ Save cart to backend as pending order
  const saveCart = async (newCart) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // Skip if not logged in

      await axios.put(
        `${API_BASE}/orders/cart`,
        { items: newCart },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (error) {
      console.error("Save cart error:", error);
    }
  };

  // ✅ Auth functions
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      toast.success("Logged in successfully!");
      return { success: true, user: response.data.user };
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      return { success: false };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/register`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      toast.success("Registered successfully!");
      return { success: true, user: response.data.user };
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCart([]);
    toast.info("Logged out!");
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
    }
  }, [fetchProducts, fetchCart]);

  // ✅ YOUR EXISTING CART FUNCTIONS (Backend synced)
  const addToCart = (product, id) => {
    const existingItem = cart.find((item) => item.id === id);
    let newCart;
    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === id ? { ...item, amount: existingItem.amount + 1 } : item,
      );
    } else {
      newCart = [...cart, { ...product, amount: 1 }];
    }
    setCart(newCart);
    toast.success("Added to cart!");
    saveCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    toast.success("Removed from cart!");
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared!");
    saveCart([]);
  };

  const increaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item,
    );
    setCart(newCart);
    toast.success("Quantity increased!");
    saveCart(newCart);
  };

  const decreaseQuantity = (id) => {
    const newCart = cart
      .map((item) => {
        if (item.id === id && item.amount > 1) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.id !== id || item.amount > 0);
    setCart(newCart);
    toast.success("Quantity decreased!");
    saveCart(newCart);
  };

  // In ShopContext.jsx - checkout function
  const checkout = async (userData) => {
    try {
      // ✅ CHECK LOGIN STATUS
      const token = localStorage.getItem("foodkartAuthToken");
      if (!token) {
        toast.error("login to checkout");
        return false;
      }

      console.log("🚀 Creating order with JWT:", userData);

      // ✅ SEND ORDER TO BACKEND with JWT
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ JWT TOKEN
        },
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem("foodkartUser"))?.id,
          ...userData,
          items: cart, // Your cart items
          total: total,
          quantity: quantity,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        clearCart(); // Clear frontend cart
        return true;
      } else {
        toast.error(result.error || "Order failed");
        return false;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed");
      return false;
    }
  };

  // // ✅ Backend Checkout (creates real order)
  // const checkout = async (userData) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       toast.error("Please login to checkout");
  //       return false;
  //     }

  //     const order = {
  //       items: cart,
  //       total,
  //       status: "pending"
  //     };

  //     const response = await axios.post(`${API_BASE}/orders`, order, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     clearCart();
  //     toast.success(`Order #${response.data._id} placed successfully!`);
  //     return true;
  //   } catch (error) {
  //     console.error("Checkout error:", error);
  //     toast.error(error.response?.data?.error || "Checkout failed");
  //     return false;
  //   }
  // };

  // Recalculate quantity & total (unchanged)
  useEffect(() => {
    const calcQuantity = cart.reduce(
      (acc, item) => acc + (item.amount || 0),
      0,
    );
    setQuantity(calcQuantity);

    const calcTotal = cart.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      return acc + price * (item.amount || 0);
    }, 0);
    setTotal(calcTotal);
  }, [cart]);

  const refreshProducts = () => fetchProducts();

  const value = {
    products,
    productsLoading,
    cart,
    quantity,
    total,
    loading,
    user, // ✅ New
    login, // ✅ New
    register, // ✅ New
    logout, // ✅ New
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    checkout,
    fetchProducts,
    refreshProducts,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};;

export default ShopContextProvider;
