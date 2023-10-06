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

// Movies/id
router.get("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const movie = await getProductsById(movieId);
  // const movie = movies.find((mv) => mv.id == movieId)
  movie ? res.send(movie) : res.status(404).send({ message: "No Movie Found" });
});

//Delete product
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  const id = +productId;
  const product = await deleteProductsById(id);
  res.send(product);
});

//Update movie
router.put("/:movieId",  async (req, res) => {
  const { movieId } = req.params;
  const updatedMovie = req.body;
  // console.log(newMovie);
  const edit = await editProductsById(movieId, updatedMovie);
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
