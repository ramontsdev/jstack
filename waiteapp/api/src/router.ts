import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/use-cases/categories/create-category';
import { listCategories } from './app/use-cases/categories/list-categories';
import { listProductsByCategory } from './app/use-cases/categories/list-product-by-category';
import { cancelOrder } from './app/use-cases/orders/cancel-order';
import { changeOrderStatus } from './app/use-cases/orders/change-order-status';
import { createOrder } from './app/use-cases/orders/create-order';
import { listOrders } from './app/use-cases/orders/list-orders';
import { createProducts } from './app/use-cases/products/create-product';
import { deleteProduct } from './app/use-cases/products/delete-product';
import { listProducts } from './app/use-cases/products/list-products';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProducts);

// Delete product
router.delete('/products/:productId', deleteProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);
// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);
