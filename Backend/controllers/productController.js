const Product = require('../models/Product');


exports.addProduct = async (req, res) => {
    try {
      const { name, stock, category, color, size, type, image } = req.body;
  
      // Check if image exists and is a valid string
      let imageBuffer = null;
  
      if (image && typeof image === 'string' && image.includes('base64,')) {
        // Remove the base64 prefix if it's included
        const base64Image = image.split(',')[1];
        // Convert the base64 string to a Buffer
        imageBuffer = Buffer.from(base64Image, 'base64');
      }
  
      const newProduct = new Product({
        name,
        stock,
        category,
        color,
        size,
        type,
        image: imageBuffer, // Store the image as a Buffer
      });
  
      await newProduct.save();
  
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (req.body.image) {
      updates.image = Buffer.from(req.body.image, 'base64');
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
