import { useState } from 'react';
import { initialProducts } from '../models/Product';

export const useProductController = () => {
  const [products, setProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
    setIsUploadModalOpen(false);
  };

  const openDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeModals = () => {
    setIsUploadModalOpen(false);
    setSelectedProduct(null);
  };

  return {
    products: filteredProducts,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isUploadModalOpen,
    setIsUploadModalOpen,
    selectedProduct,
    openDetail,
    closeModals,
    addProduct
  };
};
