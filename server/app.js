import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
import authRouter from "./routes/auth.routes.js";
import AuthMiddleware from './middlewares/Auth.js'
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import Product from "./models/Product.js";
import orderRouter from "./routes/order.routes.js";

mongoose.connect('mongodb://localhost/ecommerce-mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("SERVER STARTED!")
})

/*
app.get('/test', async (req, res) => {
  const product = new Product({
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "rating": 4.69
  })
  await product.save()
  res.send(product.toString())
})
*/


app.use('/auth', authRouter);
app.use('/product', productsRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)


app.listen(8080, () => {
  console.log("Listening on port 8080!")
})

