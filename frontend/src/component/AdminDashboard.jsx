import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/admin/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      alert('Product added successfully! 🎉');
      setFormData({ name: '', price: '', category: '', description: '' });
      setImage(null);
    } catch (error) {
      alert('Upload failed: ' + error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-emerald-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent text-center mb-12">
          ➕ Add New Product
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/50"
            required
          />
          
          <input
            type="number"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-emerald-400"
            required
          />
          
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-emerald-400"
            required
          >
            <option value="">Select Category</option>
            <option value="Pizza">Pizza</option>
            <option value="Biryani">Biryani</option>
            <option value="Burger">Burger</option>
          </select>
          
          <textarea
            rows="3"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-emerald-400"
          />
          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-4 rounded-2xl border-2 border-dashed border-purple-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-lime-600 hover:from-emerald-600 hover:to-lime-700 text-white py-6 px-8 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : '🚀 Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
