// server/src/services/ProductService.ts
import { Product } from '../models';

export class ProductService {
  static async getAllProducts(filter: any = {}) {
    return await Product.find(filter).sort({ createdAt: -1 });
  }

  static async getProductById(id: string) {
    return await Product.findById(id);
  }

  static async createProduct(data: any) {
    const product = new Product(data);
    return await product.save();
  }

  static async updateProduct(id: string, data: any) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}