import ProductService from "../services/product.service.js";

class ProductsController {
    static async getAllProducts(req, res) {
        try {
            const categories = [
                "smartphones",
                "laptops",
                "fragrances",
                "skincare",
                "groceries",
                "home-decoration"
            ]
            let allProducts = await ProductService.findProducts({})
            res.status(200).json({ success: true, data: { products: allProducts, categories } })
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

export default ProductsController