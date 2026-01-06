// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './component/ShopContext.jsx'
import { AuthProvider } from './component/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ShopContextProvider>
   <BrowserRouter>
    <AuthProvider>
     <App />
    </AuthProvider>
   </BrowserRouter>
  </ShopContextProvider>
  // </StrictMode>,
)
