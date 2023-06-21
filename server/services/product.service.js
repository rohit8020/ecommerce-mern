import Product from "../models/Product.js";

class ProductService{
    static async findProducts(){
        const products = await Product.find();
        return products
    }
}

export default ProductService;