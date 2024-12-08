import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import './ProductManagement.css';


const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'T-shirt',
      stock: 20,
      category: 'Clothing',
      color: 'Blue',
      size: 'M',
      type: 'Topwear',
      image: '',
    },
    {
      id: 2,
      name: 'Jeans',
      stock: 15,
      category: 'Clothing',
      color: 'Black',
      size: 'L',
      type: 'Bottomwear',
      image: '',
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    stock: '',
    category: '',
    color: '',
    size: '',
    type: '',
    image: '',
  });


  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Validate input fields
const validateInput = (product) => {
    const { name, stock, category, color, size, type, image } = product;
    if (!name || !stock || !category || !color || !size || !type || !image) {
      setErrorMessage('All fields are required!');
      return false;
    }
    return true;
  };


  // Add new product
  const handleAddProduct = () => {
    if (!validateInput(newProduct)) return;

    const updatedProducts = [
      ...products,
      { ...newProduct, id: Date.now(), stock: parseInt(newProduct.stock, 10) },
    ];
    setProducts(updatedProducts);
    setSuccessMessage('Product added successfully!');
    setNewProduct({
      name: '',
      stock: '',
      category: '',
      color: '',
      size: '',
      type: '',
      image: '',
    });
  };

  // Update existing product
  const handleUpdateProduct = () => {
    if (!validateInput(newProduct)) return;

    const updatedProducts = products.map((product) =>
      product.id === editProductId 
        ? { ...product, ...newProduct, stock: parseInt(newProduct.stock, 10) } 
        : product
    );

    setProducts(updatedProducts);
    setSuccessMessage('Product updated successfully!');
    setIsUpdating(false);
    setEditProductId(null);
    setNewProduct({
      name: '',
      stock: '',
      category: '',
      color: '',
      size: '',
      type: '',
      image: '',
    });
  };

  // Delete product with confirmation
  const handleDeleteProduct = (id) => {
    // Confirm before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    
    if (confirmDelete) {
      const updatedProducts = products.filter(product => product.id !== id);
      
      // Check if deletion was successful
      if (updatedProducts.length < products.length) {
        setProducts(updatedProducts);
        setSuccessMessage('Product deleted successfully!');

        // Reset form if the deleted product was being edited
        if (editProductId === id) {
          setIsUpdating(false);
          setEditProductId(null);
          setNewProduct({ name: '', stock: '', category: '', color: '', size: '' });
        }
      } else {
        setErrorMessage('Failed to delete product. Please try again.');
      }
    }
  };

  // Prepare product for editing
 const handleEditProduct = (product) => {
    setIsUpdating(true);
    setEditProductId(product.id);
    setNewProduct({
      name: product.name,
      stock: product.stock.toString(),
      category: product.category,
      color: product.color,
      size: product.size,
      type: product.type,
      image: product.image,
    });
  };

  // Animations
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
  });

  const formAnimation = useSpring({
    transform: isUpdating ? 'translateY(0)' : 'translateY(20px)',
    opacity: isUpdating ? 1 : 0.9,
    config: config.gentle,
  });

  return (
    <animated.div style={fadeIn} className="product-management-container">
      <header className="header">
        <h1 className="title">Product Management Dashboard</h1>
      </header>
      <main className="main-content">
        <animated.section style={formAnimation} className="product-form-section">
          <h2 className="section-title">{isUpdating ? 'Update Product' : 'Add New Product'}</h2>
          <form className="product-form" onSubmit={(e) => e.preventDefault()}>
  <div className="form-group">
    <label htmlFor="productName">Product Name</label>
    <input
      id="productName"
      type="text"
      placeholder="Enter product name"
      value={newProduct.name}
      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="productStock">Stock</label>
    <input
      id="productStock"
      type="number"
      placeholder="Enter stock quantity"
      value={newProduct.stock}
      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="productCategory">Category</label>
    <input
      id="productCategory"
      type="text"
      placeholder="Enter product category"
      value={newProduct.category}
      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="productColor">Color</label>
    <input
      id="productColor"
      type="text"
      placeholder="Enter product color"
      value={newProduct.color}
      onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="productSize">Size</label>
    <input
      id="productSize"
      type="text"
      placeholder="Enter product size"
      value={newProduct.size}
      onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
    />
  </div>
  
  <div className="form-group">
              <label htmlFor="productSize">Size</label>
              <input
                id="productSize"
                type="text"
                placeholder="Enter product size"
                value={newProduct.size}
                onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
              />
            </div>
  
  <div className="form-group">
    <label htmlFor="productImage">Image URL</label>
    <input
      id="productImage"
      type="text"
      placeholder="Image URL"
      value={newProduct.image}
      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
    />
  </div>
  
  <button
    className={`btn ${isUpdating ? 'btn-update' : 'btn-add'}`}
    onClick={isUpdating ? handleUpdateProduct : handleAddProduct}
    type="submit"
  >
    {isUpdating ? 'Update Product' : 'Add Product'}
  </button>
</form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </animated.section>

        <section className="product-list-section">
          <h2 className="section-title">Product Inventory</h2>
          {products.length > 0 ? (
            <ul className="product-grid">
              {products.map((product) => (
                <animated.li
                  key={product.id}
                  className="product-card"
                  style={useSpring({
                    opacity: 1,
                    transform: 'translateY(0)',
                    from: { opacity: 0, transform: 'translateY(50px)' },
                    config: config.gentle,
                  })}
                >
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-info"><span>Category:</span> {product.category}</p>
                    <p className="product-info"><span>Type:</span> {product.type}</p>
                    <p className="product-info"><span>Color:</span> {product.color}</p>
                    <p className="product-info"><span>Size:</span> {product.size}</p>
                    <p className="product-info"><span>Stock:</span> {product.stock}</p>
                  </div>
                  <div className="product-actions">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="btn btn-edit"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="btn btn-delete"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </animated.li>
              ))}
            </ul>
          ) : (
            <p className="no-products">No products available</p>
          )}
        </section>
      </main>
    </animated.div>
  );
};

export default ProductManagement;