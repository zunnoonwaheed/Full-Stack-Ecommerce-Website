import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import Router
import './App.css';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './Pages/Orders';
import Dashboard from './Pages/Dashboard';
import ProductManagement from './Pages/ProductManagement';
import OrderManagement from './Pages/OrderManagement';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerManagement from './Pages/CustomerManagement';
import ChatBot from './Components/ChatBot';
import OrderConfirmation from './Pages/OrderConfirmation';
function App() {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      <Navbar />
      <SearchBar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<OrderConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          {/* Admin Panel Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/customers" element={<CustomerManagement />} />
        </Routes>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
