import Product from "../models/Product.js";

class ProductService{
    static async findProducts(filter){
        const products = await Product.find(filter);
        return products
    }
}

export default ProductService;