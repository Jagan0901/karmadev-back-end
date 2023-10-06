import express from "express";
import {
  addProducts,
  getProductsById,
  deleteProductsById,
  editProductsById,
  getProducts,
} from "../helper.js";


const router = express.Router();

//POST method
router.post("/",  async (req, res) => {
  const {name,poster,rating,summary,category,price} = req.body;
  if(!name || !poster || !rating || !summary || !category || !price) return res.status(400).send({error:"Invalid Credentials"});
  const id = Math.floor(Math.random() * 10000 + 1);
  const newProduct = {
    id:id,
    name:name,
    poster:poster,
    rating:rating,
    summary:summary,
    category:category,
    price:price
  }
  console.log(newProduct);
  const create = await addProducts(newProduct);
  res.send(create);
});

// products/id
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const id = +productId;
  const product = await getProductsById(id);
  product
    ? res.send(product)
    : res.status(404).send({ message: "No Product Found" });
});

//Delete product
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  const id = +productId;
  const product = await deleteProductsById(id);
  res.send(product);
});

//Update movie
router.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;
  const id = +productId;
  const edit = await editProductsById(id, updatedProduct);
  res.send(edit);
});


router.get("/", async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const product = await getProducts(req);
  res.send(product);
});

export const productRouter = router;
