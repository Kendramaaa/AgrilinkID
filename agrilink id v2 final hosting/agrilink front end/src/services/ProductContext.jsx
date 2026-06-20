import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const API_BASE_URL = 'https://agrilinkid.sisteminformasikotacerdas.id/agrilink_api/index.php/api';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const mapFromAPI = (item) => ({
    id: item.id,
    user_id: Number(item.user_id),
    title: item.name,       
    desc: item.description, 
    img: item.image,       
    price: Number(item.price),
    stock: Number(item.stock),
    category: item.category,
   farmerName: item.farmer_name || 'Petani Agrilink',
  farmerPhone: item.farmer_phone || '6281234567890',
    createdAt: item.created_at || '-'
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) {
        const jsonResponse = await response.json();
        const mappedData = (jsonResponse.status && Array.isArray(jsonResponse.data)) 
          ? jsonResponse.data.map(mapFromAPI) 
          : [];
        setProducts(mappedData);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const availableProducts = products.filter((product) => {
  const isAvailable = Number(product.stock) > 0;
    const matchesSearch = (product.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return isAvailable && matchesSearch && matchesCategory;
  });

  const addProduct = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/create`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        await fetchProducts();
        return true;
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
    return false;
  };

  const updateProduct = async (id, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/update/${id}`, {
        method: 'POST', 
        body: formData
      });

      if (response.ok) {
        await fetchProducts();
        return true;
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
    return false;
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/delete/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchProducts();
        return true;
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    return false;
  };

  const openDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeModals = () => {
    setSelectedProduct(null);
  };

  const value = {
    products: availableProducts,
    allProducts: products,
    loading,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedProduct,
    openDetail,
    closeModals,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
